import { useState } from "react";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { getKelvinEmoji, kelvinTable } from "./kelvinHelper.ts";
import {
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
  IconBrandGithubFilled,
} from "@tabler/icons-react";
import YouTubeSocialIcon from "./assets/youtube_social_icon_dark.png";
import { container, transparentButton } from "./App.css.ts";

const defaultKelvinOptions = [1900, 3200, 4500, 5500, 6500, 8000, 10000];

export function App() {
  const [controlsHidden, setControlsHidden] = useState(false);
  const [temperature, setTemperature] = useState(3200);
  const rgbFromKelvin = kelvinTable[temperature];

  return (
    <Box
      role="button"
      className={container}
      style={{ backgroundColor: rgbFromKelvin }}
      onClick={
        controlsHidden ? () => setControlsHidden(!controlsHidden) : () => {}
      }
    >
      <Box h="100%" maw="1600px" mx="auto">
        {controlsHidden && (
          <Group justify="flex-end" w="100%">
            <ActionIcon
              style={{ backgroundColor: "transparent" }}
              size="lg"
              mx="xl"
              my="md"
            >
              <IconLayoutSidebarRightExpand
                color="black"
                size="lg"
                onClick={() => setControlsHidden(!controlsHidden)}
              />
            </ActionIcon>
          </Group>
        )}
        <Center
          h="100%"
          w="100%"
          style={{ visibility: controlsHidden ? "hidden" : "visible" }}
        >
          <Stack w="95vw" align="center" h="100%" justify="space-between">
            <Group gap={0} justify="space-between" w="100%">
              <Group align="start" gap="xs">
                <Text>Made by Tony Cassara</Text>
                <Group align="center">
                  <Anchor
                    c="black"
                    href="https://github.com/tonycassara/monitor-light-box"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandGithubFilled color="black" />
                  </Anchor>
                  <Anchor
                    c="black"
                    pb="2"
                    href="https://www.youtube.com/c/TonyCassara"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={YouTubeSocialIcon} width={24} />
                  </Anchor>
                </Group>
              </Group>
              <Button
                variant="outline"
                m="lg"
                color="black"
                style={{ border: "transparent" }}
                onClick={() => setControlsHidden(!controlsHidden)}
              >
                {!controlsHidden && (
                  <Text size="lg" c="black">
                    Hide controls
                  </Text>
                )}
                {!controlsHidden && (
                  <ActionIcon
                    size="lg"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <IconLayoutSidebarLeftExpand color="black" />
                  </ActionIcon>
                )}
              </Button>
            </Group>
            <Stack align="center" w="80%">
              <Title order={2} pb="sm">
                Current: {temperature}K {getKelvinEmoji(temperature)}
              </Title>
              <Slider
                value={temperature}
                color="black"
                min={1000}
                max={12000}
                step={100}
                onChange={(value) => setTemperature(value)}
                w="100%"
                labelAlwaysOn
                label={(value: number) => `${value}K`}
                labelTransitionProps={{
                  transition: "skew-down",
                  duration: 150,
                  timingFunction: "linear",
                }}
              />
              <Group justify="center" w="100%">
                {defaultKelvinOptions.map((kelvin) => (
                  <Button
                    key={kelvin}
                    className={transparentButton}
                    onClick={() => setTemperature(kelvin)}
                  >
                    {kelvin}K
                  </Button>
                ))}
              </Group>
            </Stack>
            <div />
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
