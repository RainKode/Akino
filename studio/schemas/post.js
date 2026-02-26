import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for the blog listing card (150-200 chars recommended)',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Strategy', value: 'Strategy'},
          {title: 'Behind the Scenes', value: 'Behind the Scenes'},
          {title: 'Education', value: 'Education'},
          {title: 'Case Study', value: 'Case Study'},
          {title: 'Industry News', value: 'Industry News'},
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "5 min read"',
    }),
    defineField({
      name: 'scheduledPublishDate',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      description: 'Post will only appear on the site after this date/time. Leave empty to publish immediately.',
    }),
    defineField({
      name: 'rawHtml',
      title: 'Raw HTML Content',
      type: 'text',
      rows: 30,
      description: 'Paste your complete HTML blog post content here (body content only, no <html> or <head> tags). This is rendered directly on the site.',
    }),
    defineField({
      name: 'body',
      title: 'Rich Text Content (alternative)',
      type: 'array',
      description: 'Optional — use this OR rawHtml above, not both. Rich text editor for writing directly in Sanity.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {name: 'href', type: 'url', title: 'URL'},
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Publish Date, Newest',
      name: 'publishDateDesc',
      by: [{field: 'scheduledPublishDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'scheduledPublishDate',
    },
    prepare({title, media, date}) {
      const dateLabel = date ? new Date(date).toLocaleDateString() : 'No date set'
      const isScheduled = date && new Date(date) > new Date()
      return {
        title,
        media,
        subtitle: isScheduled ? `⏰ Scheduled: ${dateLabel}` : `✓ Published: ${dateLabel}`,
      }
    },
  },
})
