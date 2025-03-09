import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essays = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./essays"}),
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        verses: z.array(z.string()),
        tags:  z.array(z.string()),
    })
})

export const collections = { essays }