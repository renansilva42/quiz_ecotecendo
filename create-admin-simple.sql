-- Script simples para criar usuário admin
-- Execute este script no SQL Editor do Supabase

-- Método 1: Usar a função auth.users() se disponível
DO $$
BEGIN
    -- Tentar criar usuário usando função do Supabase
    PERFORM auth.users(
        email := 'admin@ecotecendo.com.br',
        password := 'admin123456',
        user_metadata := '{"name": "Administrador", "instagram": "admin_ecotecendo"}'::jsonb,
        email_confirm := true
    );
    
    RAISE NOTICE 'Usuário admin criado com sucesso!';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Erro ao criar usuário: %', SQLERRM;
END $$;

-- Método 2: Inserção direta (se o método 1 não funcionar)
INSERT INTO auth.users (
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    raw_app_meta_data
) VALUES (
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@ecotecendo.com.br',
    crypt('admin123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"name": "Administrador", "instagram": "admin_ecotecendo"}',
    '{"provider": "email", "providers": ["email"]}'
) ON CONFLICT (email) DO UPDATE SET
    encrypted_password = crypt('admin123456', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now();

-- Verificar se foi criado
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    raw_user_meta_data
FROM auth.users 
WHERE email = 'admin@ecotecendo.com.br';
