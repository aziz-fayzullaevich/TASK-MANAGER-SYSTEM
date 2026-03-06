import { ActionIcon, Avatar, Button, Flex, Group, Loader, SegmentedControl, Title } from "@mantine/core";
import { Global, Moon, ShoppingCart, Sun1, Task } from 'iconsax-reactjs';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import { profileQueries } from "../../features/profile/queries/profile-queries";
import { notifications } from "@mantine/notifications";
import styles from './header.module.css';

export const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { data: userImage, isLoading } = profileQueries.useFetchProfile(!!token);

    const handleLogout = () => {
        notifications.show({ title: 'Успех', message: 'Вы вышли!', color: 'green' });
        localStorage.removeItem('token');
        navigate(ROUTES.LOGIN);
        window.location.reload();
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <Flex className="in-header" align={'center'} justify={'space-between'}>
                    <Link to={ROUTES.HOME} className={styles.link}>
                        <Task
                            size="32"
                            color="#FF8A65"
                        />
                        <Title order={3} c="dark">Task Management System</Title>
                    </Link>
                    <Group align="center" gap={"md"}>
                        <NavLink to={ROUTES.PRODUCTS} className={styles.link}>
                            <ShoppingCart
                                size="20"
                                color="#FF8A65"
                            />
                        </NavLink>
                        <SegmentedControl
                            withItemsBorders={true}
                            radius="xl"
                            data={[
                                {
                                    value: 'Light', label: <Sun1
                                        size="16"
                                        color="#ff8a65"
                                        variant="Broken"
                                    />
                                },
                                {
                                    value: 'Dark', label: <Moon
                                        size="16"
                                        color="#ff8a65"
                                    />
                                }
                            ]}
                        />
                        <Global
                            size="20"
                            color="#ff8a65"
                            variant="Broken"
                        />
                        {token ? (
                            <Group gap="sm">
                                {isLoading ? (
                                    <Loader size="sm" />
                                ) : (
                                    <ActionIcon
                                        variant="transparent"
                                        onClick={() => navigate(ROUTES.PROFILE)}
                                    >
                                        <Avatar radius="xl" color="orange" src={userImage?.image} />
                                    </ActionIcon>
                                )}
                                <Button variant="subtle" color="red" size="xs" onClick={handleLogout}>
                                    Выйти
                                </Button>
                            </Group>
                        ) : (
                            <Button variant="filled" onClick={() => navigate(ROUTES.LOGIN)}>
                                Войти
                            </Button>
                        )}
                    </Group>
                </Flex>
            </div>
        </header>
    )
};