import Cli from '../../cli';
import { server, serverComd } from '@chrissong/simo-core';

export default (cli: Cli) => {
  const { cmd, desc, builder } = serverComd;

  cli.register(cmd, desc, builder, (argv: any) => {
    debugger;
    server(cli);
  });
};
