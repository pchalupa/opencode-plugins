import type { Plugin } from '@opencode-ai/plugin';

export const Peon: Plugin = async ({ $ }) => {
  const VOLUME_FULL = 0.5;
  const VOLUME_BACKGROUND = 0.25;
  const PLUGINS_DIR = `${process.env.HOME}/.config/opencode/plugins`;

  const play = async (file: string, volume = VOLUME_FULL) => {
    try {
      await $`afplay -v ${volume} ${PLUGINS_DIR}/assets/audio/${file}`.quiet();
    } catch (error) {}
  };

  const pick = (options: string[]): string => options[Math.floor(Math.random() * options.length)];

  return {
    event: async ({ event }) => {
      switch (event.type) {
        case 'session.created':
          await play(pick(['PeonYes1.wav', 'PeonReady1.wav', 'PeonYes3.wav', 'PeonWarcry1.wav']));
          break;

        case 'session.idle':
          await play(pick(['PeonWhat1.wav', 'PeonWhat2.wav', 'PeonYes3.wav']));
          break;

        case 'session.error':
          await play(
            pick(['PeonPissed1.wav', 'PeonPissed2.wav', 'PeonPissed3.wav', 'PeonDeath.wav'])
          );
          break;

        case 'command.executed':
          await play(
            pick([
              'PeonYesAttack1.wav',
              'PeonYesAttack2.wav',
              'PeonYesAttack3.wav',
              'PeonWarcry1.wav',
            ])
          );
          break;

        case 'permission.replied':
          if (event.properties.response === 'reject')
            await play(pick(['PeonPissed3.wav', 'PeonPissed4.wav']));
          else await play(pick(['PeonYes2.wav', 'PeonYes4.wav']));

          break;

        case 'file.edited':
          await play(pick(['PeonYes1.wav', 'PeonYes2.wav']), VOLUME_BACKGROUND);
          break;
      }
    },
  };
};
