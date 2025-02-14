const { MessageEmbed } = require('discord.js')

/**
 * A MessageEmbed with the default fields already filled
 * @constructor
 * @param {User} [user] - The user that executed the command that resulted in this embed
 * @param {object} [data] - Data to set in the rich embed
 */
module.exports = class SwitchbladeEmbed extends MessageEmbed {
  constructor (user, data = {}) {
    super(data)
    this.setColor(process.env.EMBED_COLOR).setTimestamp()
    if (user) this.setFooter(user.tag)
    this._files = []
  }

  /**
   * Sets the description of this embed based on an array of arrays of strings
   * @param {Array<Array>} Array containing arrays (blocks) of and strings
   * @returns {SwitchbladeEmbed}
   */
  setDescriptionFromBlockArray (blocks) {
    this.description = blocks.map(lines => lines.filter(l => !!l).join('\n')).filter(b => !!b.length).join('\n\n')
    return this
  }

  setDescription (description) {
    if (description instanceof Array) return super.setDescription(description.join('\n'))
    else return super.setDescription(description.toString?.() ?? description)
  }

  attachFiles (t) {
    if (t instanceof Array) this._files = [...this._files, ...t]
    else this._files.push(t)
    return this
  }
}
