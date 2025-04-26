This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Game

Deployed on Netlify <a href="https://uno-multiplayer-game.netlify.app/">link.</a>

The backend is deployed on Render under free-tier, so it might take a while for it to be up and running.

![image](https://github.com/user-attachments/assets/667d4aac-70b2-4cd7-bf3e-af34e7377616)

This is the starting screen of the game, where the players can give themselves an interesting name after which they are taken to the home screen.

![image](https://github.com/user-attachments/assets/1bf726d6-be3a-4980-ba20-440a0190a0ec)

Here the players can choose to create a game for themselves and invite their friends to join or join an existing lobby for a quick game.

![image](https://github.com/user-attachments/assets/58cf466d-a667-4310-8343-4278dded4117)

![image](https://github.com/user-attachments/assets/4b9b65cc-d71b-4ca5-a8ac-ce3fa72faacf)

If the player chooses to create a game, they should provide a name for the lobby and set minimum number of players required to start a game.

![image](https://github.com/user-attachments/assets/9333cf99-7fdb-4da2-9287-d6150cc34289)
![image](https://github.com/user-attachments/assets/1fd03f55-86f4-40a2-a361-401f4d1f011e)

On successful creation, they are taken to the lobby where they can:

- Wait for other players
- Copy game-id to clipboard and share it with their friends
- Chat with other players.
Shortcuts:
    - <b>Space:</b> To open chat window.
    - <b>Enter:</b> To send a message after typing.
    - <b>Escape:</b> Close chat window.
- Change minimum number of players required to start a game. <i>Note: The minimum players cannot be less than the current number of players in the lobby.</i>
- Start a game once minimum number of players have joined and everyone is ready.
- Leave game. <i>Note: If host leaves the game, then the next player is automatically selected as host. If everyone leave the game, then the lobby will be deleted permanently</i>

![image](https://github.com/user-attachments/assets/703aef49-16f0-4222-ba15-ee5cbd1fe130)

If a player wants to join an existing lobby, they can click on <i> Join Lobby </i> button which will then navigate the player to page displaying list of available games. They can any one of them or search for a particular lobby created and shared by their friend using the search field.

![image](https://github.com/user-attachments/assets/2c59c3de-b088-4aa1-a1c1-e9a950ec9bc0)

![image](https://github.com/user-attachments/assets/20c45b6f-81b7-4e95-a802-b2aa73554426)

The start button will be enabled only when all the players are ready.

![image](https://github.com/user-attachments/assets/860f2e84-c8dc-4205-aead-6782fbb8cdea)

Upon starting a game, the cards are dealt to all the players and displays whose turn it is.

![image](https://github.com/user-attachments/assets/26a4f511-a105-443d-8607-4d977b0e932a)

If a player is drawing a card, and they still dont have valid card to play, then they can end their turn or else play they that they drew from the draw pile.

![image](https://github.com/user-attachments/assets/c81f0821-21cf-4c49-82db-0e86a36fdb3c)

![image](https://github.com/user-attachments/assets/08e0064b-adac-4f91-91b4-76b37de9d53a)

When playing a Draw 4 (+4) or a Wild card, the player can choose the color before playing that card.

![image](https://github.com/user-attachments/assets/5089d899-84f8-48eb-8e4c-5b8daef93fff)

After the game is over, the winner is displayed to all the players and the host gets a button to replay which will take all the players back to the lobby.

![image](https://github.com/user-attachments/assets/2bca4981-dba1-4ffb-ae7c-d2a174541818)

Players can continue to chat even during the game.

![image](https://github.com/user-attachments/assets/eb948394-5712-434b-acc8-44aa65aa320b)

Players cannot join a full-lobby.

![image](https://github.com/user-attachments/assets/a316f265-868a-4216-b5ec-444090ad1a3f)

Host can edit the minimum number of players needed to start a game. It cannot go below the current number of players in the lobby.

![image](https://github.com/user-attachments/assets/ee5e3640-2fb3-4945-83dc-347fd6256560)

![image](https://github.com/user-attachments/assets/6292d59e-f22a-42c7-a894-bd2fa491bdfd)

If host leave the game or disconnects, then the next player in the lobby is automatically selected as the host.





