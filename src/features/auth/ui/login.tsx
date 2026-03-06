import { Button, Center, Container, Group, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import type { User } from "../types/auth-types";
import { ROUTES } from "../../../shared/constants/routes";
import { authQueries } from "../queries/auth-queries";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<User>();
    const { mutate: loginUser, isPending } = authQueries.useLogin();

    const onSubmit = (data: User) => {
        loginUser({ data });
        reset();
    };

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
                                Авторизация
                            </Title>

                            <TextInput
                                label="Имя"
                                placeholder="Введите имя"
                                {...register('username', { required: 'обязательное поле' })}
                                error={errors.username?.message}
                            />

                            <PasswordInput
                                label="Пароль"
                                placeholder="********"
                                {...register('password', { required: 'обязательное поле' })}
                                error={errors.password?.message}
                            />

                            <Stack gap="sm" mt="md">
                                <Button fullWidth size="md" color="orange.6" type="submit" loading={isPending}>
                                    Войти
                                </Button>

                                <Group align="center" justify="space-between" mt={"md"}>
                                    <Button variant="subtle" color="gray" size="xs" onClick={() => navigate(ROUTES.HOME)}>
                                        Назад на главную
                                    </Button>
                                    <Button variant="subtle" color="gray" size="xs" onClick={() => navigate(ROUTES.REGISTER)} >
                                        Зарегистрировать
                                    </Button>
                                </Group>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Center>
        </Container>
    )
};

export default Login;