import { ActionIcon, Avatar, Button, Flex, Group, Loader, SegmentedControl, Title } from "@mantine/core";
import { Global, Moon, Sun1 } from 'iconsax-reactjs';
import styles from './header.module.css';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import { profileQueries } from "../../features/profile/queries/profile-queries";
import { notifications } from "@mantine/notifications";

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

    const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#ffa13b' : '#2e2e2e44',
    textDecoration: 'none',
    fontWeight:  700,
    fontSize: '18px',
    transition: 'all 0.2s ease',
});

    return (
        <header className={styles.header}>
            <div className="container">
                <Flex className="in-header" align={'center'} justify={'space-between'}>
                    <Link to={ROUTES.HOME}>
                        <Title order={3} c="#ff8a65">Task Management System</Title>
                    </Link>
                    <Group align="center" gap={"md"}>
                        <NavLink to={ROUTES.PRODUCTS} style={navLinkStyle}>Продукты</NavLink>
                        <Global
                            size="20"
                            color="#ff8a65"
                            variant="Broken"
                        />
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
                        {token ? (
                            <Group gap="sm">
                                {isLoading ? (
                                    <Loader size="sm" />
                                ) : (
                                    <ActionIcon
                                        variant="transparent"
                                        onClick={() => navigate(ROUTES.PROFILE)}
                                    >
                                        <Avatar radius="xl" color="orange" src={userImage?.image}/>
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
}