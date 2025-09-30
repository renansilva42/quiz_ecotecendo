-- Script robusto para criar usuário admin no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Primeiro, verificar se o usuário já existe
DO $$
DECLARE
    user_exists boolean;
    user_id uuid;
BEGIN
    -- Verificar se o usuário já existe
    SELECT EXISTS(
        SELECT 1 FROM auth.users 
        WHERE email = 'admin@ecotecendo.com.br'
    ) INTO user_exists;
    
    IF user_exists THEN
        RAISE NOTICE 'Usuário admin já existe. Deletando e recriando...';
        
        -- Deletar usuário existente
        DELETE FROM auth.users WHERE email = 'admin@ecotecendo.com.br';
    END IF;
    
    -- Criar novo usuário admin
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        invited_at,
        confirmation_token,
        confirmation_sent_at,
        recovery_token,
        recovery_sent_at,
        email_change_token_new,
        email_change,
        email_change_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        phone,
        phone_confirmed_at,
        phone_change,
        phone_change_token,
        phone_change_sent_at,
        confirmed_at,
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at,
        is_sso_user,
        deleted_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'admin@ecotecendo.com.br',
        crypt('admin123456', gen_salt('bf')),
        now(),
        now(),
        '',
        now(),
        '',
        null,
        '',
        '',
        null,
        now(),
        '{"provider": "email", "providers": ["email"]}',
        '{"name": "Administrador", "instagram": "admin_ecotecendo"}',
        false,
        now(),
        now(),
        null,
        null,
        '',
        '',
        null,
        now(),
        '',
        0,
        null,
        '',
        null,
        false,
        null
    ) RETURNING id INTO user_id;
    
    RAISE NOTICE 'Usuário admin criado com sucesso! ID: %', user_id;
    
    -- Confirmar o email do usuário
    UPDATE auth.users 
    SET email_confirmed_at = now(),
        confirmed_at = now()
    WHERE id = user_id;
    
    RAISE NOTICE 'Email do usuário admin confirmado!';
    
END $$;

-- 2. Verificar se o usuário foi criado corretamente
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    raw_user_meta_data
FROM auth.users 
WHERE email = 'admin@ecotecendo.com.br';

-- 3. Criar entrada na tabela de identidades (se necessário)
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
)
SELECT 
    gen_random_uuid(),
    u.id,
    jsonb_build_object(
        'sub', u.id::text,
        'email', u.email,
        'email_verified', true,
        'phone_verified', false
    ),
    'email',
    now(),
    now(),
    now()
FROM auth.users u
WHERE u.email = 'admin@ecotecendo.com.br'
AND NOT EXISTS (
    SELECT 1 FROM auth.identities i 
    WHERE i.user_id = u.id
);

-- 4. Verificar se tudo foi criado corretamente
SELECT 
    u.id,
    u.email,
    u.email_confirmed_at,
    u.created_at,
    u.raw_user_meta_data,
    i.provider,
    i.identity_data
FROM auth.users u
LEFT JOIN auth.identities i ON i.user_id = u.id
WHERE u.email = 'admin@ecotecendo.com.br';
