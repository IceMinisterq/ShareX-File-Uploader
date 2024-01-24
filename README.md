# Share X File Uploader


## Usage

To deploy this project run

Once you've **properly** configured your server, you can run `node index.js` in the src folder to start the server. You can keep your server running forever using pm2. You can run `npm i -g pm2` to install pm2. Then you can run your server by running `pm2 start index.js`, and monitor logs and such using `pm2 monit`.

#### Make sure to edit the `config.json` and the `Authorization` to a strong password, you can use a site like [passwordsgenerator.net](https://passwordsgenerator.net/old.php)
> The files does not delete themself after a certain amount of time so make sure to clean them at least one time a month.


### Sharex Configuration
- The `authorization` must be set in the request body;
- The file form name must be set `fdata`;
- The upload endpoint returns a string with the dirrect file link;

#### Open the Share X Config file [Config.sxcu](https://google.com) and head up to 

![](https://github.com/IceMinisterq/Share-X-File-Uploader/assets/86623018/58fe67fe-1dbf-4e8e-9abd-a6216b4db926)
