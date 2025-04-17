const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const path = require('path');
const googleTTS = require('google-tts-api'); // Import Google TTS

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

const yesAnswers = [
    "Hell to the mf’n yeah.",
    "Does a bear crap in the woods?",
    "You damn right.",
    "Bet your sweet ass I do.",
    "Sure as shit.",
    "F* yeah, buddy!",
    "Why the hell not?",
    "Yup — with bells on my nipples.",
    "Ohhh, you better believe it, buttercup.",
    "I’m in — balls deep.",
    "Hell yeah",
    "Damn straight",
    "You bet your sweet ass",
    "F yeah",
    "Yup",
    "Aye aye, captain",
    "Damn right",
    "Bet your balls",
    "Sho’ nuff",
    "Fin’ A",
    "You know it",
    "Hells to the yeah",
    "Fo’ shizzle",
    "10-4, good buddy",
    "Abso-freakin-lutely",
    "Balls deep, baby",
    "Roger that",
    "Word to your mama",
    "Hit me",
    "Let’s fin’ go",
    "Fin' right",
    "Right in the kisser",
    "Say less",
    "Without a fin' doubt",
    "Duh, dipshit",
    "Yeehaw",
    "You fin’ know it",
    "Shit yeah",
    "Ride or die",
    "I'd say that's a big 10-4",
    "On God",
    "For damn sure",
    "No brainer",
    "Bring the noise",
    "Sign me the f up",
    "As if I wouldn’t",
    "My body is ready",
    "Fin’ send it",
    "Balls to the wall",
    "Lock it in",
    "Count me the hell in",
    "Affirmative, motherfer",
    "That’s a green light",
    "Oh hells yeah",
    "Copy that, bitch",
    "Yes, bitch",
    "You already know",
    "You damn right",
    "Absolutely, you filthy animal",
    "Hell yeah, brother",
    "Put me in, coach",
    "That's a go, ho",
    "Roger-f***in’-that",
    "Tits up",
    "I'm down like a clown",
    "With bells on, bitch",
    "Like white on rice",
    "Yes indeedy, skeet-skeety",
    "I’ll drink to that",
    "Chug it and send it",
    "Fratty confirmed",
    "You know it, brotein shake",
    "Rager mode ON",
    "Bet, you absolute weapon",
    "For the boys",
    "That’s a hard yes, like my morning wood",
    "Smash that yes button",
    "As sure as my keg stand record",
    "Let’s rage",
    "Send it, full throttle",
    "Absolutely, you beautiful bastard",
    "Bros before no’s",
    "Confirmed like last Friday's blackout",
    "Yeet that approval",
    "Can I get a HELL YEAH?",
    "I’m harder than orgo",
    "Lick it, stick it, send it",
    "That’s a straight-up green flag",
    "Yes, and I’ll shotgun to that",
    "Frat-signed, bro-sealed, delivered",
    "I'm in like sin",
    "Ripped and ready",
    "Balls to the fin’ ceiling",
    "All gas, no brakes",
    "That’s a yes, you sexy legend",
    "Fin’ oath, bro",
    "You got it, king",
    "Yessir, Mr. Steal-Your-Girl",
    "I’m down like a pledge with no self-esteem",
    "Gonna need a beer for this yes",
    "Sheeeeeesh, yeah",
    "That’s a bellyflop into yes",
    "Say less, I’m there",
    "As confirmed as a freshman’s fake ID",
    "We’re doing it live",
    "Fire it up",
    "On God, my guy",
    "I’m in deeper than Chad in finals week",
    "Sign me up with a Sharpie on a solo cup",
    "Absolutely, you walking protein bar",
    "Swole-signed, frat-sealed",
    "Vibing with that",
    "Like beer to pong, my guy",
    "I’d yes that twice",
    "That’s a big ol’ W",
    "Yes, with two chest bumps and a keg stand",
    "All in, no prenup",
    "Rip the shirt off and let’s do it",
    "Yes, like I said to that taco at 3AM",
    "I’m in like a buzzed freshman at a foam party",
    "Confirmed like a drunk text",
    "Sign me the hell up, daddy",
    "Affirm-a-bro-tive",
    "F yeah, and spike it",
    "Born ready, frat steady",
    "Flex and yes",
    "Yes-eroni with the beefaroni",
    "Damn right, Chadwick",
];
    

const noAnswers = [
    "Hell no, techno.",
    "Not even if you paid me in tacos and bad decisions.",
    "F* no, and I mean that politely.",
    "I'd rather lick a cactus.",
    "Nope — not my circus, not my monkey, not my damn problem.",
    "Only if pigs sprout wings and crap gold.",
    "I’d rather get a root canal from a raccoon.",
    "Negative, ya filthy animal.",
    "No, and may God have mercy on your soul for asking.",
    "That's a no so hard it reversed time.",
    "Hell no",
    "F no",
    "Not a damn chance",
    "Not today, Satan",
    "Nah, bruh",
    "Negative, Ghost Rider",
    "Hard pass",
    "Eat a d",
    "Hell to the nah",
    "Get bent",
    "F outta here",
    "Nah fam",
    "In your dreams",
    "When pigs fly",
    "Not even if you paid me",
    "Kiss my ass",
    "Piss off",
    "Nope",
    "Suck an egg",
    "Ain’t happenin’",
    "You must be high",
    "Not even a little",
    "Shove it",
    "Over my dead body",
    "That’s a no from me, dawg",
    "F that noise",
    "Go f yourself",
    "I’d rather shit in my hands and clap",
    "I’d rather wrestle a cactus",
    "Not in a million fin’ years",
    "Ha! Good one",
    "Dream the f on",
    "You wish",
    "Negative, Nancy",
    "Get real",
    "Big fat nope",
    "You kiddin’ me?",
    "Not a fin’ chance",
    "I’d sooner die",
    "In what fin’ world?",
    "I’ll pass, dumbass",
    "Don’t hold your breath",
    "Hell no, techno",
    "Go ask someone who gives a s",
    "That’s a hell-to-the-nope",
    "I decline, ya degenerate",
    "No sir, f off",
    "Not my circus",
    "Not today, jackass",
    "Go suck a lemon",
    "You crazy, man",
    "Don’t make me laugh",
    "That dog don’t hunt",
    "No dice",
    "Put that back where it came from",
    "Nope-rope",
    "I wouldn’t touch that with a ten-foot pole",
    "Absolutely the f not",
    "My ass says no",
    "Go pound sand",
    "F no, pledge",
    "Get wrecked",
    "Miss me with that weak sauce",
    "That’s a negatron, bro",
    "Nah dawg, I ain’t that blacked",
    "I’d rather cuddle a cactus",
    "Bro, do I look sober enough for that?",
    "Get that outta my beer pong zone",
    "I’d rather lose flip cup",
    "No cap, that’s a fat nope",
    "Bro, even my liver said no",
    "GTFO, Chad",
    "Negative, Nancy-boy",
    "That’s a no from this alpha",
    "Nah, my guy — that’s some geed s",
    "Not even if I was five shots deep",
    "Declined like a freshman's credit card",
    "Hard pass, like a linebacker",
    "My dignity’s already in the red",
    "No shot, broseph",
    "That’s a big ol’ NOPE-a-saurus",
    "I'd rather get paddled",
    "The answer is get fed",
    "As if I’m that down bad",
    "Not unless it comes with pizza",
    "F outta here with that GDI energy",
    "That’s a hell no in varsity",
    "Swerve",
    "Naaaaaah, bro",
    "That’s a dry campus move",
    "No sir, Mr. Buzzkill",
    "I'd rather chug hot dog water",
    "Not unless you Venmo me",
    "Swiping left on that dumbass idea",
    "F to the no-no",
    "Bro, even my hangover says no",
    "That ain’t it, chief",
    "More no than my GPA",
    "Bro, that’s sus AF",
    "I’d rather streak through a cactus field",
    "Not happening, keg monkey",
    "Tell your mom I said no",
    "Zero percent sendability",
    "Not with that face",
    "Decline harder than my calc grade",
    "Bro, I’d rather fight a raccoon",
    "Harder pass than frat hazing laws",
    "Respectfully, get bent",
    "I’ll take “F No” for 500, Alex",
    "Bro, I have standards (low, but still)",
    "I’d rather rewatch The Notebook with my ex",
    "I’m ghostin' that like a Tinder match",
    "No way, frat Satan",
    "You’ve lost your f***in’ mind",
    "I’m allergic to dumb",
    "Ask me again and I’ll throw a paddle",
    "Harder no than campus parking",
    "Nah bro, that's extra cringe",
    "Bro, that’s a full send to Nopeville",
    "Don’t make me yeet you out of this convo",
];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check if the message starts with "!8ball"
    if (message.content.toLowerCase().startsWith('!8ball')) {
        const userQuestion = message.content.slice(6).trim(); // Extract the user's question

        // Fetch a random GIF from the yesno.wtf API
        const url = 'https://yesno.wtf/api';
        const response = await fetch(url); // Fetch the GIF
        const data = await response.json();

        // Randomly decide yes or no
        const isYes = data.answer === "yes";
        const textResponse = isYes
            ? yesAnswers[Math.floor(Math.random() * yesAnswers.length)]
            : noAnswers[Math.floor(Math.random() * noAnswers.length)];

        // Send the response with the GIF
        message.channel.send({
            content: `🎱 ${textResponse}`,
            files: [data.image] // Attach the GIF from the API
        });

        // Check if the user is in a voice channel
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) {
            message.channel.send("You need to be in a voice channel for me to join!");
            return;
        }

        // Generate TTS URL
        const ttsUrl = googleTTS.getAudioUrl(`You asked: ${userQuestion}. The answer is: ${textResponse}`, {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
        });

        // Join the voice channel and play the TTS audio
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(ttsUrl);

        player.play(resource);
        connection.subscribe(player);

        // Disconnect after the audio finishes
        player.on('idle', () => {
            connection.destroy();
        });
    }
});


client.login('MTM2MTg5Mzk5ODI5NzM1MDE4NQ.G7_Zll.yC3WgkU1buvVH087qJ6COGaUmoS5UzfApvRb5k'); // Replace with your bot token