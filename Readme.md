# freegames-notifier

Tool to send Notification for free games.

Currently supported:
- [Epic Games](https://store.epicgames.com)


## Configuration

The script can be configured using environment variables.

| Name | Default | Explanation | 
| --- | --- | --- |
| LOCALE | en-US | Locale of the name/description|
| COUNTRY | DE | |
| CHECK_INTERVAL | 3600 | Interval between checks in seconds |
| DISCORD_WEBHOOKS |  | Comma seperated list of Discord Webhooks that send notifications |