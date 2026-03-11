import {
    Center,
    Loader,
    Stack,
    Title,
    Paper,
    Avatar,
    Text,
    Group,
    Badge,
    Divider,
    Grid,
    ThemeIcon,
    useMantineColorScheme,
} from "@mantine/core";
import { profileQueries } from "../queries/profile-queries";
import { Sms, Call, Location, Calendar } from 'iconsax-reactjs';
import { useTranslation } from "react-i18next";

export const ProfileList = () => {
    const { colorScheme } = useMantineColorScheme();
    const { data: profile, isLoading } = profileQueries.useFetchProfile();
    const {t} = useTranslation();

    if (isLoading) return (
        <Center h="70vh"><Stack align="center"><Loader color="orange" size="xl" type="bars" /></Stack></Center>
    );

    if (!profile) return (
        <Center h="70vh"><Text c="red" fz="xl" fw={700}>{t('profile.empty-profile')}</Text></Center>
    );

    return (
        <div className="container">
            <Paper
                radius="lg"
                p={0}
                withBorder
                style={{
                    backgroundColor: colorScheme === 'dark' ? 'rgba(20, 20, 20, 0.9)' : '#fff',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${colorScheme === 'dark' ? '#333' : '#eee'}`,
                }}
            >
                <Grid gutter={0}>
                    <Grid.Col span={{ base: 12, md: 4 }} style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                        padding: '40px',
                        borderRight: '1px solid #333'
                    }}>
                        <Stack align="center" gap="xl">
                            <div style={{ position: 'relative' }}>
                                <Avatar
                                    src={profile.image}
                                    size={180}
                                    radius={100}
                                    style={{ border: '3px solid #ffa13b', boxShadow: '0 0 20px rgba(255, 161, 59, 0.2)' }}
                                />
                                <Badge
                                    size="sm"
                                    variant="filled"
                                    color="orange"
                                    style={{ position: 'absolute', bottom: 10, right: 10, border: '2px solid #000' }}
                                >
                                    ID: {profile.id}
                                </Badge>
                            </div>

                            <Stack gap={5} align="center">
                                <Title order={2} c="white" fz={28} fw={800}>{profile.username}</Title>
                                <Text c="dimmed" fz="sm" tt="uppercase" lts={1}>{t('profile.personal-profile')}</Text>
                            </Stack>

                            <Badge color="orange" variant="outline" size="xl" radius="sm" h={40} fullWidth>
                                {profile.gender === 'male' ? `${t('profile.male')}` : `${t('profile.female')}`} • {profile.age} {t('profile.y-o')}
                            </Badge>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 8 }} p={40}>
                        <Stack gap={30}>
                            <div>
                                <Title order={4} c="orange.5" mb="xl" fz={18} tt="uppercase" lts={2}>
                                  {t('profile.details-info')}
                                </Title>

                                <Grid gutter="xl">
                                    <Grid.Col span={6}>
                                        <InfoBlock icon={Sms} label={t('profile.email-address')} value={profile.email} />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <InfoBlock icon={Call} label={t('profile.phone-number')} value={profile.phone} />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <InfoBlock icon={Location} label={t('profile.location')} value={`${profile.address.city}, ${profile.address.state}`} />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <InfoBlock icon={Calendar} label={t('profile.date-bd')} value={profile.birthDate || `${t('profile.not-specified')}`} />
                                    </Grid.Col>
                                </Grid>
                            </div>

                            <Divider color="#333" />

                            <Text c="dimmed" fz="xs" ta="right">
                                {t('profile.account-status')} <span style={{ color: '#40c057' }}>● {t('profile.active')}</span>
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>
        </div>
    );
};

const InfoBlock = ({ icon: Icon, label, value }: any) => (
    <Group wrap="nowrap" align="flex-start">
        <ThemeIcon variant="light" color="orange" size={42} radius="md">
            <Icon size="22" variant="Broken" />
        </ThemeIcon>
        <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={0.5}>{label}</Text>
            <Text size="md" c="white" fw={500}>{value}</Text>
        </div>
    </Group>
);