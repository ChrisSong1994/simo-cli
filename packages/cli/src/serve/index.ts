import Cli from '../../cli';
import { serve, serveCmd } from '@chrissong/simo-core';

export default (cli: Cli) => {
  const { cmd, desc, builder } = serveCmd;

  cli.register(cmd, desc, builder, (argv: any) => {
    serve(cli, argv);
  });
};
