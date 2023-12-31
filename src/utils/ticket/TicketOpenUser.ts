import {TextChannel, Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType, User} from 'discord.js';
import config from '../../config.json';
import { addRole, removeRole, userHasActiveTickets } from '../../utils/Utils';

function openTicketUser(user: User, type: string, client: Client, channelName: string, interaction) {

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
			}, {

				id: config.team_role_id,
				allow: ["ViewChannel"],
			}]
	})
		.then((channel) => {

			if (channel instanceof TextChannel) {

				const close = new ButtonBuilder()
					.setCustomId('close_ticket')
					.setLabel('Close')
					.setStyle(ButtonStyle.Danger);
				const claim = new ButtonBuilder()
					.setCustomId('claim_ticket')
					.setLabel('Claim')
					.setStyle(ButtonStyle.Success);

				const row = new ActionRowBuilder()
					.addComponents(close, claim);
				channel.setTopic(user.id);
				channel.send("Ticket created by <@"+user.id+">");
				// @ts-ignore
				channel.send({ components: [row],  embeds: [getEmbed(user, type, client)]});

				interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setColor(0x7ACB0C)
							.setTitle('Success!')
							.setDescription("Created ticket: <#" + channel.id + ">")
							.setTimestamp()
					],
					ephemeral: true
				});
				addRole(client, config.ticket_role_id, user.id);
			}
		})
		.catch((error) => {
			console.error('Error creating ticket channel:', error);
			interaction.reply({
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

function getEmbed(user: User, type: string, client: Client) {
	let embed;
	embed = new EmbedBuilder()
		.setColor(0xEB8922)
		.setTitle('Application Ticket!')
		.setDescription("This ticket is about the "+type+" application of " + user.username)
		.setTimestamp()
	return embed;
}

export { openTicketUser }
