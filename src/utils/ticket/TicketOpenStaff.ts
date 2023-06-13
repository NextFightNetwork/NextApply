import {TextChannel, Client, EmbedBuilder, Embed, ChannelType, Channel, Interaction, User, CacheType} from 'discord.js';

function openTicketStaff(staff: User, user: User, type: string, client: Client, channelName: string, interact) {
    const guild = client.guilds.cache.get('1051758423211003951');
    if (!guild) return;

    guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: null,
        permissionOverwrites: [
        {
            id: guild.roles.everyone,
            deny: ["ViewChannel"]
        },
        {
            id: user.id,
            allow: ["ViewChannel"]
        },
        {
            id: staff.id,
            allow: ["ViewChannel"],
        }, {

            id: "1095773070414844076", // Team role ID
            allow: ["ViewChannel"],

        },{
            id: "1106641978218782792", // Mod role ID
            allow: ["ViewChannel"]
        }]
    })
        .then((channel) => {

            if (channel instanceof TextChannel) {
                //TODO add buttons (close & claim)
                channel.send("Ticket created by <@"+staff.id+"> for the applicant <@"+user.id+">");
                channel.send({ embeds: [getEmbed(staff, user, type, client)] });
                interact.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0x7ACB0C)
                            .setTitle('Success!')
                            .setDescription("Created ticket: <#" + channel.id + ">")
                            .setTimestamp()
                    ],
                    ephemeral: true
                });
            }
        })
        .catch((error) => {
            console.error('Error creating ticket channel:', error);
            interact.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xFFFE00)
                        .setTitle('Warning!')
                        .setDescription("Something went wrong...")
                        .setTimestamp()
                ],
                ephemeral: true
            });
        });

}

function getEmbed(staff: User, user: User, type: string, client: Client) {
    let embed;
    switch (type) {
        case "content": {
            embed = new EmbedBuilder()
                .setColor(0xEB8922)
                .setTitle('Application Ticket!')
                .setDescription("This ticket is about the content application of " + user.username)
                .setTimestamp()
            break;
        }
        default: {

        }
    }
    return embed;
}

export { openTicketStaff }