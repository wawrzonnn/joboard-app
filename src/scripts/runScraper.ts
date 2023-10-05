import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { scrapeOffers } from './scrapeOffers';

(async () => {
  const argv = await yargs(hideBin(process.argv))
    .option('s', {
      alias: 'search',
      describe: 'Search term for the job',
      type: 'string',
      default: 'frontend',
    })
    .option('l', {
      alias: 'limit',
      describe: 'Limit the number of job offers',
      type: 'number',
      default: 10,
    })
    .help()
    .alias('help', 'h')
    .argv;

  scrapeOffers(argv.s, argv.l);
})();