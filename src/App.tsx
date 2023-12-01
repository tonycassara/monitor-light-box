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
const darkThemeDefault = 3200;
const lightThemeDefault = 6500;

const getDefaultTemperature = () => {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return lightThemeDefault;
  } else {
    return darkThemeDefault;
  }
};

export function App() {
  const [controlsHidden, setControlsHidden] = useState(false);
  const [temperature, setTemperature] = useState(getDefaultTemperature());
  const rgbFromKelvin = kelvinTable[temperature];

  return (
    <Box
      role="button"
      className={container}
      style={{
        backgroundColor: rgbFromKelvin,
        overflow: "hidden",
        transition: "background-color 280ms ease",
      }}
      onClick={
        controlsHidden ? () => setControlsHidden(!controlsHidden) : () => {}
      }
    >
      <Box w="100%" h="100%" pos="relative" maw="1280px" mx="auto">
        <Button
          variant="outline"
          color="black"
          onClick={() => setControlsHidden(!controlsHidden)}
          pos="absolute"
          right={0}
          top={0}
          my="md"
          style={{
            border: "transparent",
            opacity: controlsHidden ? "1" : "0",
            transition: "opacity 220ms ease",
            transitionDelay: "220ms",
          }}
        >
          {<Text>Show controls</Text>}
          {
            <ActionIcon size="lg" style={{ backgroundColor: "transparent" }}>
              <IconLayoutSidebarRightExpand
                color="black"
                onClick={() => setControlsHidden(!controlsHidden)}
              />
            </ActionIcon>
          }
        </Button>
        <Center h="100%" w="100%">
          <Stack
            w="95vw"
            align="center"
            h="100%"
            justify="space-between"
            style={{
              opacity: controlsHidden ? "0" : "1",
              transition: "opacity 220ms ease",
              transitionDelay: "220ms",
            }}
          >
            <Stack pt="md" gap={0} align="flex-end" justify="flex-end" w="100%">
              <Button
                variant="outline"
                color="black"
                style={{ border: "transparent" }}
                onClick={() => setControlsHidden(!controlsHidden)}
              >
                {<Text>Hide controls</Text>}
                {
                  <ActionIcon
                    size="lg"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <IconLayoutSidebarLeftExpand color="black" />
                  </ActionIcon>
                }
              </Button>
            </Stack>
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
            <Group align="center" gap="xs" pb="xl">
              <Text>Made by Tony Cassara</Text>
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
                href="https://www.youtube.com/c/TonyCassara"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={YouTubeSocialIcon} width={24} />
              </Anchor>
            </Group>
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
