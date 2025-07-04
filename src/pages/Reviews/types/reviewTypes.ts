/**
 * Represents the primary category type of a review.
 */
export enum Category {
  Movie = 1,
  Show,
  Book,
  FoodAndDrink,
  Entertainment,
}

/**
 * Enum representing specific types of venues for experiences.
 * Used primarily to associate an experience with a real-world location type.
 */
export enum Venue {
  Restaurant = 'restaurant',
  Cafe = 'cafe',
  FoodTruck = 'food_truck',
  StreetFood = 'street_food',
  Bakery = 'bakery',
  Brewery = 'brewery',
  FastFood = 'fast_food',
  Deli = 'deli',
  JazzClub = 'jazz_club',
  Karaoke = 'karaoke',
  Arcade = 'arcade',
  ComedyClub = 'comedy_club',
  LiveMusic = 'live_music',
  Theater = 'theater',
  Bar = 'bar',
  Museum = 'museum',
  Nightclub = 'nightclub',
  Garden = 'garden',
  HotSpring = 'hot_spring',
}

/**
 * Interface representing additional metadata for a food and drink-type review.
 *
 * @interface FoodAndDrinkSub
 * @property {string} title - Name of the experience or location.
 * @property {string} address - Street address of the venue.
 * @property {string} city - City where the experience took place.
 * @property {string} [state] - Optional state field (primarily for US).
 * @property {string} country - Country where the experience took place.
 * @property {number} latitude - Latitude coordinate of the location.
 * @property {number} longitude - Longitude coordinate of the location.
 * @property {number} [priceLevel] - Optional price level (e.g. 1 = cheap, 5 = luxury).
 * @property {Venue} venue - Name of the venue hosting the experience.
 * @property {string[]} cuisines - List of cuisines or food styles featured.
 */
export interface FoodAndDrinkSub {
  title: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
  priceLevel?: number;
  venue: Venue;
  cuisines: string[];
}

/**
 * Interface representing additional metadata for an experience-type review.
 *
 * @interface ExperienceSub
 * @property {string} title - Name of the experience or location.
 * @property {string} address - Street address of the venue.
 * @property {string} city - City where the experience took place.
 * @property {string} [state] - Optional state field (primarily for US).
 * @property {string} country - Country where the experience took place.
 * @property {number} latitude - Latitude coordinate of the location.
 * @property {number} longitude - Longitude coordinate of the location.
 * @property {number} [priceLevel] - Optional price level (e.g. 1 = cheap, 5 = luxury).
 * @property {Venue} venue - Name of the venue hosting the experience.
 */
export interface EntertainmentSub {
  title: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
  priceLevel?: number;
  venue: Venue;
}

/**
 * Interface representing additional metadata for a book-type review.
 *
 * @interface BookSub
 * @property {string} title - Title of the book.
 * @property {string} author - Author of the book.
 * @property {number} pages - Total number of pages in the book.
 * @property {number} yearPublished - Year the book was published.
 * @property {string} [isbn] - Optional ISBN identifier.
 * @property {string[]} genres - List of genres associated with the book.
 */
export interface BookSub {
  title: string;
  author: string;
  pages: number;
  yearPublished: number;
  isbn?: string;
  genres: string[];
}

/**
 * Interface representing additional metadata for a movie-type review.
 *
 * @interface MovieSub
 * @property {string} title - Title of the movie.
 * @property {string} director - Director of the film.
 * @property {number} durationMin - Duration of the movie in minutes.
 * @property {number} yearReleased - Year the movie was released.
 * @property {string} country - Country of origin.
 * @property {string} studio - Production studio behind the film.
 * @property {number} imdbRatingX10 - IMDb rating multiplied by 10 (e.g. 83 = 8.3).
 * @property {string[]} genres - List of genres the movie belongs to.
 */
export interface MovieSub {
  title: string;
  director: string;
  durationMin: number;
  yearReleased: number;
  country: string;
  studio: string;
  imdbRatingX10: number;
  genres: string[];
}

/**
 * Interface representing additional metadata for a show-type review.
 *
 * @interface ShowSub
 * @property {string} title - Title of the show.
 * @property {number} yearReleased - Year the show first aired.
 * @property {string} country - Country of origin.
 * @property {string} [studio] - Optional production studio.
 * @property {number} imdbRatingX10 - IMDb rating multiplied by 10.
 * @property {string[]} genres - List of genres the show belongs to.
 */
export interface ShowSub {
  title: string;
  yearReleased: number;
  country: string;
  studio?: string;
  imdbRatingX10: number;
  genres: string[];
}

/**
 * Base metadata shared by all reviews.
 *
 * @interface ReviewHeader
 * @property {string} reviewId - Unique identifier for the review.
 * @property {number} rating - Numerical rating given by the reviewer.
 * @property {string} reviewText - The body of the review content.
 * @property {string} createdAt - ISO timestamp of when the review was created.
 * @property {CategoryId} categoryId - The category this review belongs to.
 */
export interface ReviewHeader {
  reviewId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  categoryId: Category;
}

/**
 * Union type representing a fully typed review entry, including subcontent specific to the review's category.
 *
 * - If categoryId is 1 (Movie), subcontent is of type MovieSub
 * - If categoryId is 2 (Show), subcontent is of type ShowSub
 * - If categoryId is 3 (Book), subcontent is of type BookSub
 * - If categoryId is 4 (FoodAndDrink), subcontent is of type FoodAndDrinkSub
 * - If categoryId is 5 (Entertainment), subcontent is of type EntertainmentSub
 * - For unsupported or missing subcontent, it may be a generic Record or null
 */
export type Review =
  | (ReviewHeader & { categoryId: Category.Movie; subcontent: MovieSub })
  | (ReviewHeader & { categoryId: Category.Show; subcontent: ShowSub })
  | (ReviewHeader & { categoryId: Category.Book; subcontent: BookSub })
  | (ReviewHeader & {
      categoryId: Category.FoodAndDrink;
      subcontent: FoodAndDrinkSub;
    })
  | (ReviewHeader & {
      categoryId: Category.Entertainment;
      subcontent: EntertainmentSub;
    })
  | (ReviewHeader & { subcontent: Record<string, unknown> | null });

/**
 * Interface representing the structure of the response returned by the Reviews Read API.
 *
 * @interface ReviewsReadApiResponse
 * @property {Review[]} results - Array of Review objects returned by the query.
 * @property {string | null} nextCursor - Cursor for pagination; null if there are no more results.
 */
export interface ReviewsReadApiResponse {
  results: Review[];
  nextCursor: string | null;
}
