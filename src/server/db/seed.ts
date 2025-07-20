import { db } from ".";
import { tree } from "./schema/tree";

async function seed() {
    console.log("Seed Started");

    const trees = Array.from({ length: 50 }, (_, i) => ({
        title: `Tree ${i + 1}`,
        draft: [],
        nodes: [],
        edges: [],
        userId: "mWo60h04cz228B6ZoftWF3Usq5q6kg2Q",
        showMiniMap: true,
    }));

    await db.insert(tree).values(trees);

    console.log("Seed Ended");
}

await seed();
