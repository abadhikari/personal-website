import { ContentMetadata } from '../../../types/uploadTypes';

interface ExperienceMetadataFormProps {
  metadata: ContentMetadata;
  onMetadataChange: <K extends keyof ContentMetadata>(
    field: K,
    value: ContentMetadata[K]
  ) => void;
}

/**
 * Form component for editing shared experience metadata across content types.
 *
 * Includes inputs for:
 * - Name, address, city, optional state, and country
 * - Latitude and longitude
 * - Venue type (e.g. cafe, jazz club, theater)
 * - Price level ($ to $$$$$)
 *
 * Used by both Food & Drink and Entertainment content flows.
 *
 * @param {ExperienceMetadataFormProps} props - Component props
 * @param {ContentMetadata} props.metadata - Current metadata state
 * @param {function} props.onMetadataChange - Callback to update specific metadata fields
 *
 * @returns {JSX.Element} The rendered shared metadata form
 */
export default function ExperienceMetadataForm({
  metadata,
  onMetadataChange,
}: ExperienceMetadataFormProps) {
  return (
    <>
      <label htmlFor="title">
        Title<span className="required">*</span>
        <input
          id="title"
          type="text"
          value={metadata.title}
          onChange={(e) => onMetadataChange('title', e.target.value)}
        />
      </label>
      <label htmlFor="address">
        Address<span className="required">*</span>
        <input
          id="address"
          type="text"
          value={metadata.address}
          onChange={(e) => onMetadataChange('address', e.target.value)}
        />
      </label>
      <label htmlFor="city">
        City<span className="required">*</span>
        <input
          id="city"
          type="text"
          value={metadata.city}
          onChange={(e) => onMetadataChange('city', e.target.value)}
        />
      </label>
      <label htmlFor="state">
        State
        <input
          id="state"
          type="text"
          value={metadata.state || ''}
          onChange={(e) => {
            const val = e.target.value;
            onMetadataChange('state', val === '' ? undefined : val);
          }}
        />
      </label>
      <label htmlFor="country">
        Country<span className="required">*</span>
        <input
          id="country"
          type="text"
          value={metadata.country}
          onChange={(e) => onMetadataChange('country', e.target.value)}
        />
      </label>
      <label htmlFor="latitude">
        Latitude<span className="required">*</span>
        <input
          id="latitude"
          type="number"
          value={metadata.latitude}
          onChange={(e) =>
            onMetadataChange('latitude', parseFloat(e.target.value))
          }
        />
      </label>
      <label htmlFor="longitude">
        Longitude<span className="required">*</span>
        <input
          id="longitude"
          type="number"
          value={metadata.longitude}
          onChange={(e) =>
            onMetadataChange('longitude', parseFloat(e.target.value))
          }
        />
      </label>
      <label htmlFor="venueId">
        Venue ID<span className="required">*</span>
        <select
          id="venueId"
          value={metadata.venueId}
          onChange={(e) =>
            onMetadataChange('venueId', parseInt(e.target.value, 10))
          }
        >
          <option value={-1}>-- Select a venue --</option>
          <option value={1}>Restaurant</option>
          <option value={2}>Cafe</option>
          <option value={3}>Food Truck</option>
          <option value={4}>Street Food</option>
          <option value={5}>Bakery</option>
          <option value={6}>Brewery</option>
          <option value={7}>Fast Food</option>
          <option value={8}>Deli</option>
          <option value={9}>Jazz Club</option>
          <option value={10}>Karaoke</option>
          <option value={11}>Arcade</option>
          <option value={12}>Comedy Club</option>
          <option value={13}>Live Music</option>
          <option value={14}>Theater</option>
          <option value={15}>Bar</option>
          <option value={16}>Museum</option>
          <option value={17}>Nightclub</option>
          <option value={18}>Garden</option>
          <option value={19}>Hot Spring</option>
        </select>
      </label>
      <label htmlFor="priceLevel">
        <div>
          Price Level<span className="required">*</span>
        </div>
        <select
          id="priceLevel"
          value={metadata.priceLevel}
          onChange={(e) =>
            onMetadataChange('priceLevel', parseInt(e.target.value, 10))
          }
        >
          <option value={-1}>-- Select a price level --</option>
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
          <option value={5}>$$$$$</option>
        </select>
      </label>
    </>
  );
}
