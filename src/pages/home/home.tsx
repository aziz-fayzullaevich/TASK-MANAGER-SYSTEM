import {
    Title,
    Text,
    Button,
    Stack,
    Group,
    Badge,
    rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star1 } from 'iconsax-reactjs';
import '@mantine/carousel/styles.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='container'>
            <Stack align="center" gap="xl">
                <Badge
                    variant="filled"
                    color="orange.6"
                    size="lg"
                    radius="sm"
                    leftSection={<Star1 size={14} variant="Bold" />}
                >
                    {t('main.new-version')} 3.0
                </Badge>

                <Title
                    order={1}
                    ta="center"
                    fz={rem(72)}
                    fw={900}
                    style={{ lineHeight: 1, letterSpacing: rem(-2) }}
                >
                    Manage your tasks <br />
                    <Text
                        component="span"
                        inherit
                        variant="gradient"
                        gradient={{ from: 'orange.4', to: 'orange.7', deg: 90 }}
                    >
                        with precision.
                    </Text>
                </Title>

                <Text c="dimmed" ta="center" fz="xl" maw={600}>
             {t('main.home-desc')}
                </Text>

                <Group gap="md">
                    <Button
                        size="md"
                        radius="md"
                        onClick={() => navigate('/products')}
                        rightSection={<ArrowRight size={20} />}
                    >
                        {t('main.get-to-products')}
                    </Button>
                </Group>
            </Stack>
        </div>
    );
};
export default Home;