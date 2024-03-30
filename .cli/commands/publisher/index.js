const { chalk, message, op, prefix, flagsToParams, fs, semver } = arcli;

export const NAME = 'publisher';
export const ID = NAME;

const DESC = 'Publish the module to NPM';
const pkg = fs.readJsonSync(process.cwd() + '/package.json');
const ver = semver.inc(op.get(pkg, 'version'), 'patch');

// prettier-ignore
const HELP = () => console.log(`
Example:
  $ reactium publisher --version 0.0.1
`);

const INPUT = ({ inquirer }, params) => {
    return inquirer.prompt(
        [
            {
                type: 'input',
                name: 'version',
                prefix,
                message: 'version',
                default: ver,
                suffix: chalk.magenta(': '),
            },
        ],
        params,
    );
};

const ACTION = async ({ opt, props }) => {
    const flags = ['version'];

    let params = flagsToParams({ opt, flags });

    const userInput = await INPUT(props, params);
    Object.entries(userInput).forEach(([key, val]) => (params[key] = val));

    pkg.version = params.version;

    fs.writeFileSync(
        process.cwd() + '/package.json',
        JSON.stringify(pkg, null, 2),
    );

    message(`Updated ${chalk.magenta('package.json')}`);
};

export const COMMAND = ({ program, props }) =>
    program
        .command(NAME)
        .description(DESC)
        .action((opt) => ACTION({ opt, props }))
        .option('-v, --version [version]', 'semantic version of the package.')
        .on('--help', HELP);
