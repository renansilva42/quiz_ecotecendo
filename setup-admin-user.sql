-- ============================================
-- Script para Criar Usuário Admin - Quiz das Águas
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- Navegue para: Project > SQL Editor > New Query
-- Cole este script e execute
-- ============================================

-- Passo 1: Remover usuário admin existente (se houver)
DO $$
BEGIN
    DELETE FROM auth.users WHERE email = 'admin@ecotecendo.com.br';
    RAISE NOTICE 'Usuários existentes removidos (se houver)';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Nenhum usuário existente para remover';
END $$;

-- Passo 2: Criar novo usuário admin
DO $$
DECLARE
    new_user_id uuid;
BEGIN
    -- Gerar ID para o novo usuário
    new_user_id := gen_random_uuid();
    
    -- Criar usuário na tabela auth.users
    -- Nota: confirmed_at é uma coluna gerada automaticamente, não incluir
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
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at,
        is_sso_user,
        deleted_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',  -- instance_id
        new_user_id,                              -- id
        'authenticated',                          -- aud
        'authenticated',                          -- role
        'admin@ecotecendo.com.br',               -- email
        crypt('admin123456', gen_salt('bf')),    -- encrypted_password
        now(),                                    -- email_confirmed_at
        now(),                                    -- invited_at
        '',                                       -- confirmation_token
        now(),                                    -- confirmation_sent_at
        '',                                       -- recovery_token
        null,                                     -- recovery_sent_at
        '',                                       -- email_change_token_new
        '',                                       -- email_change
        null,                                     -- email_change_sent_at
        now(),                                    -- last_sign_in_at
        '{"provider": "email", "providers": ["email"]}'::jsonb,  -- raw_app_meta_data
        '{"name": "Administrador", "instagram": "admin_ecotecendo"}'::jsonb,  -- raw_user_meta_data
        false,                                    -- is_super_admin
        now(),                                    -- created_at
        now(),                                    -- updated_at
        null,                                     -- phone
        null,                                     -- phone_confirmed_at
        '',                                       -- phone_change
        '',                                       -- phone_change_token
        null,                                     -- phone_change_sent_at
        '',                                       -- email_change_token_current
        0,                                        -- email_change_confirm_status
        null,                                     -- banned_until
        '',                                       -- reauthentication_token
        null,                                     -- reauthentication_sent_at
        false,                                    -- is_sso_user
        null                                      -- deleted_at
    );
    
    RAISE NOTICE 'Usuário admin criado com ID: %', new_user_id;
    
    -- Criar entrada na tabela auth.identities
    INSERT INTO auth.identities (
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) VALUES (
        new_user_id::text,
        new_user_id,
        jsonb_build_object(
            'sub', new_user_id::text,
            'email', 'admin@ecotecendo.com.br',
            'email_verified', true,
            'phone_verified', false
        ),
        'email',
        now(),
        now(),
        now()
    );
    
    RAISE NOTICE 'Identidade criada para o usuário admin';
    
END $$;

-- Passo 3: Verificar se o usuário foi criado corretamente
SELECT 
    '✅ USUÁRIO ADMIN CRIADO COM SUCESSO!' as status,
    u.id as user_id,
    u.email,
    u.email_confirmed_at,
    u.confirmed_at,
    u.created_at,
    u.raw_user_meta_data,
    i.provider,
    i.identity_data->>'email_verified' as email_verified
FROM auth.users u
LEFT JOIN auth.identities i ON i.user_id = u.id
WHERE u.email = 'admin@ecotecendo.com.br';

-- Passo 4: Verificar se as tabelas do quiz existem
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'water_quiz_settings')
        THEN '✅ Tabela water_quiz_settings existe'
        ELSE '❌ Tabela water_quiz_settings NÃO existe - Execute a migração!'
    END as settings_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'water_quiz_results')
        THEN '✅ Tabela water_quiz_results existe'
        ELSE '❌ Tabela water_quiz_results NÃO existe - Execute a migração!'
    END as results_status;

-- ============================================
-- CREDENCIAIS DO ADMINISTRADOR
-- ============================================
-- Email: admin@ecotecendo.com.br
-- Senha: admin123456
-- ============================================
