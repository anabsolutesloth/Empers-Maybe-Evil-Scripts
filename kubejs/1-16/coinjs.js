onEvent('item.registry', event => {
	event.create('coinjs:coin')
})

onEvent('item.right_click', event => {
	//Safety checks
	if(!event.server || event.item.id != 'coinjs:coin' || !event.item.nbt.value) return

	//Set this variable up
	let size = 1
	//When Sneaking, use the whole stack
	if(event.player.isCrouching()) size = event.item.count

	global.giveMoney(event.player, event.item.nbt.value * size, `${size}}x coinItem'`)

	//Shrink the stack
	event.item.count -= size
})

onEvent('item.tooltip', event => {
	event.addAdvanced('coinjs:coin', (item, adv, text) => {
		//Safety checks
		if(!item.nbt || !item.nbt.value) return
		//Add the value of the coin to the tooltip, as the second line
		text.add(1, Text.of(item.nbt.value).color('#E6BE47').bold())
	})
})

//Arbitrary Function to give money to player with a Status Message, showing the added amount and their new balance
// invoked by coin items
/**
* @param {PlayerJS} player
* @param {int} amount
* @param {string (optional)} source
*/
global.giveMoney = (player, amount, source) => {
	source = source || undefined
	console.log(`${player} was given ${amount} coins by source '${source}'`)
	FTBMoney.addMoney(player, amount)
	player.setStatusMessage(Text.of(`+${amount} (${FTBMoney.getMoney(player)})`).color('#E6BE47').bold())
}
