import { inject, injectable } from "tsyringe";
import { Client, MessageEmbed, ContextMenuInteraction } from "discord.js";
import { ClientToken, COLORS } from "../../../../Constants";
import BaseCommand from "../../../../utils/BaseCommand";

@injectable()
export default class extends BaseCommand {
    constructor(@inject(ClientToken) public client: Client) {
        super({
            name: "Count Characters"
        });
    }

    async execute(interaction: ContextMenuInteraction) {
        await interaction.deferReply({
            ephemeral: true
        });

        const message = interaction.options.getMessage("message");
        const count = message.content?.length ?? 0;

        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle("Message Characters Count")
            .setColor(COLORS.NORMAL)
            .setAuthor(message.author.username)
            .setDescription(message.content || "**No content available!**")
            .setFooter(`Total ${count} character${count === 1 ? "" : "s"}`);

        await interaction.followUp({ embeds: [embed] });
    }
}
