let games = [
    {
        id: "1",
        title: "The Legend of Zelda: Breath of the Wild",
        platform: ["Nintendo Switch", "Wii U"],
    },
    {
        id: "2",
        title: "God of War",
        platform: ["PlayStation 4"],
    },
    {
        id: "3",
        title: "Red Dead Redemption 2",
        platform: ["PlayStation 4", "Xbox One", "PC"],
    },
]

let reviews = [
    {
        id: "1",
        rating: 5,
        content: "An amazing open-world experience with stunning visuals and gameplay.",
        authorId: "1",
    },
    {
        id: "2",
        rating: 4,
        content: "A thrilling adventure with a compelling story and characters.",
        authorId: "2",
    },
    {
        id: "3",
        rating: 5,
        content: "A masterpiece of storytelling and gameplay, a must-play for any gamer.",
        authorId: "3",
    },
]

let authors = [
    {
        id: "1",
        name: "John Doe",
        verified: true,
    },
    {
        id: "2",
        name: "Jane Smith",
        verified: false,
    },
    {
        id: "3",
        name: "Bob Johnson",
        verified: true,
    },
]

export default { games, reviews, authors }