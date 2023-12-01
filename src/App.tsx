import { useState } from "react";
import {
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
import {
  container,
  transparentButton,
  transparentButtonSelected,
} from "./App.css.ts";

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
        <Center h="100%" w="100%">
          <Stack w="95vw" align="center" h="100%" justify="space-between">
            <Stack pt="md" gap={0} align="flex-end" justify="flex-end" w="100%">
              <Group w="100%" align="center" gap={0} justify="space-between">
                <Anchor
                  c="black"
                  href="https://github.com/tonycassara/monitor-light-box"
                  target="_blank"
                  rel="noopener noreferrer"
                  mx="sm"
                  style={{
                    height: 20,
                    opacity: controlsHidden ? "0" : "1",
                    transition: "opacity 220ms ease",
                  }}
                >
                  <IconBrandGithubFilled height="20" color="black" />
                </Anchor>
                <Button
                  variant="outline"
                  color="black"
                  style={{ border: "transparent" }}
                  onClick={() => setControlsHidden(!controlsHidden)}
                  rightSection={
                    controlsHidden ? (
                      <IconLayoutSidebarRightExpand color="black" />
                    ) : (
                      <IconLayoutSidebarLeftExpand color="black" />
                    )
                  }
                >
                  <Text>
                    {controlsHidden ? "Show controls" : "Hide controls"}
                  </Text>
                </Button>
              </Group>
            </Stack>
            <Stack
              align="center"
              w="80%"
              style={{
                opacity: controlsHidden ? "0" : "1",
                transition: "opacity 220ms ease",
              }}
            >
              <Title order={2} style={{ textWrap: "balance" }}>
                {temperature}K {getKelvinEmoji(temperature)}
              </Title>
              <Slider
                value={temperature}
                color="black"
                min={1000}
                max={12000}
                step={100}
                onChange={(value) => setTemperature(value)}
                w="100%"
                label={null}
              />
              <Group justify="center" w="100%">
                {defaultKelvinOptions.map((kelvin) => (
                  <Button
                    key={kelvin}
                    className={
                      kelvin === temperature
                        ? transparentButtonSelected
                        : transparentButton
                    }
                    onClick={() => setTemperature(kelvin)}
                    c={kelvin === temperature ? rgbFromKelvin : "black"}
                  >
                    {kelvin}K
                  </Button>
                ))}
              </Group>
              <Text style={{ textAlign: "center", textWrap: "balance" }}>
                <b>Hint:</b> Disable Night Shift (on Mac) or Night Light (on
                Windows) for best results
              </Text>
            </Stack>
            <Group
              align="center"
              pb="md"
              gap="xs"
              style={{
                opacity: controlsHidden ? "0" : "1",
                transition: "opacity 220ms ease",
              }}
            >
              <Text>Made by Tony Cassara</Text>
              <Anchor
                c="black"
                href="https://www.youtube.com/c/TonyCassara"
                target="_blank"
                rel="noopener noreferrer"
                m={0}
                style={{
                  height: 20,
                }}
              >
                <img src={YouTubeSocialIcon} height={16} />
              </Anchor>
            </Group>
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
