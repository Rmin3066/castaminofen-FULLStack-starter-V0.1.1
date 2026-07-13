import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface PodcastSummary {
  id: string;
  slug: string;
  title: string;
  channel: string;
  description: string;
  category: string;
  image: string;
  accent: string;
  episodeCount: number;
}

const podcasts = [
  {
    id: 'pod-1',
    slug: 'maker-hour',
    title: 'Maker Hour',
    channel: 'Northstar Media',
    description: 'A practical show for builders shipping thoughtful products.',
    category: 'Technology',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    accent: '#2563eb',
    episodes: [
      {
        id: 'ep-1',
        slug: 'launching-a-better-ux',
        title: 'Launching a Better UX',
        description: 'How the team simplified onboarding without losing depth.',
        duration: '42 min',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        publishedAt: '2026-07-10',
        podcastSlug: 'maker-hour',
      },
      {
        id: 'ep-2',
        slug: 'designing-for-focus',
        title: 'Designing for Focus',
        description: 'A conversation on calmer interfaces and better pacing.',
        duration: '38 min',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        publishedAt: '2026-07-03',
        podcastSlug: 'maker-hour',
      },
    ],
  },
  {
    id: 'pod-2',
    slug: 'city-stories',
    title: 'City Stories',
    channel: 'Beacon Collective',
    description: 'Voices from neighborhoods, cafés, and late-night trains.',
    category: 'Culture',
    image:
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    accent: '#7c3aed',
    episodes: [
      {
        id: 'ep-3',
        slug: 'the-library-after-hours',
        title: 'The Library After Hours',
        description: 'Stories from the civic spaces keeping neighborhoods alive.',
        duration: '31 min',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        publishedAt: '2026-06-28',
        podcastSlug: 'city-stories',
      },
    ],
  },
  {
    id: 'pod-3',
    slug: 'founders-at-dawn',
    title: 'Founders at Dawn',
    channel: 'Northstar Media',
    description: 'Short interviews with founders building with care.',
    category: 'Business',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    accent: '#0f766e',
    episodes: [
      {
        id: 'ep-4',
        slug: 'building-with-resilience',
        title: 'Building with Resilience',
        description: 'A founder explains how calm systems beat heroic launches.',
        duration: '45 min',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        publishedAt: '2026-06-20',
        podcastSlug: 'founders-at-dawn',
      },
    ],
  },
];

@Injectable()
export class PodcastsService {
  constructor(private readonly prisma: PrismaService = {} as PrismaService) {}

  findAll() {
    return podcasts.map((podcast) => ({
      ...podcast,
      episodeCount: podcast.episodes.length,
    }));
  }

  findBySlug(slug: string) {
    return podcasts.find((podcast) => podcast.slug === slug);
  }

  findEpisodes() {
    return podcasts.flatMap((podcast) => podcast.episodes);
  }

  findEpisodeBySlug(slug: string) {
    return podcasts.flatMap((podcast) => podcast.episodes).find((episode) => episode.slug === slug);
  }

  findEpisodesByPodcastSlug(slug: string) {
    const podcast = this.findBySlug(slug);
    if (!podcast) throw new NotFoundException('Podcast not found');
    return podcast.episodes;
  }

  search(term: string) {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      return {
        podcasts: this.findAll(),
        episodes: this.findEpisodes(),
        channels: Array.from(new Set(podcasts.map((podcast) => podcast.channel))),
      };
    }

    return {
      podcasts: this.findAll().filter((podcast) => {
        const haystack =
          `${podcast.title} ${podcast.description} ${podcast.channel} ${podcast.category}`.toLowerCase();
        return haystack.includes(normalized);
      }),
      episodes: this.findEpisodes().filter((episode) => {
        const haystack =
          `${episode.title} ${episode.description} ${episode.podcastSlug}`.toLowerCase();
        return haystack.includes(normalized);
      }),
      channels: Array.from(new Set(podcasts.map((podcast) => podcast.channel))).filter((channel) =>
        channel.toLowerCase().includes(normalized),
      ),
    };
  }

  getHome() {
    return {
      featuredPodcasts: this.findAll().slice(0, 2),
      latestEpisodes: this.findEpisodes().slice(0, 4),
      continueListening: this.findEpisodes().slice(0, 2),
      categories: Array.from(new Set(podcasts.map((podcast) => podcast.category))),
      channels: Array.from(new Set(podcasts.map((podcast) => podcast.channel))),
    };
  }
}
