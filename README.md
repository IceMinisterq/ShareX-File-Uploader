# Share X File Uploader


## Usage

Once you've **properly** configured your server, you can run `node index.js` in the src folder to start the server. You can keep your server running forever using pm2. You can run `npm i -g pm2` to install pm2. Then you can run your server by running `pm2 start index.js`, and monitor logs and such using `pm2 monit`.

Make sure to edit the `config.json` and the `Authorization` to a strong password, you can use a site like [passwordsgenerator.net](https://passwordsgenerator.net/old.php)
> The files uploaded **are not automatically deleted** after a certain amount of time so make sure to monitor your uploads.
> This project was made for personal usage so be aware with who you are sharing your authorization to not have inappropriate content uploaded on your server.

### Dependencies :
  - [randomstring](https://www.npmjs.com/package/randomstring)
  - [express](https://www.npmjs.com/package/express)
  - [express-formidable](https://www.npmjs.com/package/express-formidable)

## Sharex Configuration
- The `authorization` must be set in the request body
- The file form name must be set `fdata`
- The upload endpoint returns a string with the direct file link based on the `Base Url` settings

You can either use the Template present in the downloadable full source code or copy the settings of your new custom upload settings like this :

![](https://github.com/IceMinisterq/Share-X-File-Uploader/assets/86623018/58fe67fe-1dbf-4e8e-9abd-a6216b4db926)
