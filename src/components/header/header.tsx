import { ActionIcon, Avatar, Button, Flex, Group, SegmentedControl, Title } from "@mantine/core";
import { Global, Moon, ShoppingCart, Sun1, Task } from 'iconsax-reactjs';
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import { profileQueries } from "../../features/profile/queries/profile-queries";
import { notifications } from "@mantine/notifications";
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import styles from './header.module.css';

export const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { data: userImage } = profileQueries.useFetchProfile(!!token);
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    const handleLogout = () => {
        notifications.show({ title: 'Успех', message: 'Вы вышли!', color: 'green' });
        localStorage.removeItem('token');
        navigate(ROUTES.LOGIN);
        window.location.reload();
    };

    return (
        <header className={styles.header} style={{
            backgroundColor: 'transparent',
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${colorScheme === 'dark' ? '#252525' : '#e9ecef'}`
        }}>
            <div className="container">
                <Flex align={'center'} justify={'space-between'}>
                    <Link to={ROUTES.HOME} className={styles.link} style={{ textDecoration: 'none' }}>
                        <Task size="32" color={theme.colors.orange[5]} variant="Bulk" />
                        <Title order={3} c={colorScheme === 'dark' ? 'white' : 'dark'}>
                            TMS
                        </Title>
                    </Link>

                    <Group gap="xl">
                        <ActionIcon variant="transparent" onClick={() => navigate(ROUTES.PRODUCTS)}>
                            <ShoppingCart
                                size="25"
                                color="#FF8A65"
                            />
                        </ActionIcon>
                        <SegmentedControl
                            value={colorScheme}
                            onChange={(value) => setColorScheme(value as any)}
                            data={[
                                { label: <Sun1 size={16} />, value: 'light' },
                                { label: <Moon size={16} />, value: 'dark' },
                            ]}
                            color="orange"
                            radius="xl"
                        />

                        <Global
                            size="20"
                            color="#ff8a65"
                            variant="Broken"
                        />

                        {token ? (
                            <Group gap="sm">
                                <Avatar
                                    src={userImage?.image}
                                    radius="xl"
                                    color="orange"
                                    style={{ cursor: 'pointer', border: `2px solid ${theme.colors.orange[5]}` }}
                                    onClick={() => navigate(ROUTES.PROFILE)}
                                />
                                <Button variant="outline" color="red" size="compact-sm" onClick={handleLogout}>
                                    Выйти
                                </Button>
                            </Group>
                        ) : (
                            <Button variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>
                                Войти
                            </Button>
                        )}
                    </Group>
                </Flex>
            </div>
        </header>
    )
};