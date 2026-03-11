import { Button, Center, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import type { User } from "../types/auth-types";
import { ROUTES } from "../../../shared/constants/routes";
import { useTranslation } from "react-i18next";

const Register = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const onSubmit = () => { };

    return (
        <Container size="xs" h="100vh">
            <Center h="100%">
                <Paper radius="lg"
                    w={'420px'}
                    p={40}
                    withBorder
                    style={{
                        backgroundColor: '#111',
                        borderColor: '#333',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                        borderTop: '4px solid #ffa13b'
                    }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap="lg">
                            <Title order={2} ta="center" c="orange.5">
                              {t('auth.register')}
                            </Title>

                            <TextInput
                                label={t('auth.name')}
                                placeholder={t('auth.placeholder-name')}
                                {...register('username', { required: `${t('auth.required-filed')}` })}
                                error={errors.username?.message}
                            />

                            <TextInput
                                label="E-mail"
                                placeholder="exmaple@gmail.com"
                                {...register('email', { required: `${t('auth.required-filed')}` })}
                                error={errors.email?.message}
                            />

                            <PasswordInput
                                label={t('auth.password')}
                                placeholder="********"
                                {...register('password', { required: `${t('auth.required-filed')}` })}
                                error={errors.password?.message}
                            />

                            <Stack gap="sm" mt="md">
                                <Button fullWidth size="md" color="orange.6" type="submit">
                                    {t('auth.register')}
                                </Button>
                                <Button variant="subtle" color="gray" size="xs" onClick={() => navigate(ROUTES.HOME)}>
                                    {t('auth.back-to-main')}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Center>
        </Container>
    )
};

export default Register;