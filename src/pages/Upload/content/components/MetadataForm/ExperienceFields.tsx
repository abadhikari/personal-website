import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

/* eslint-disable react/jsx-props-no-spreading */ // RHF needs the spread

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

/**
 * Reusable form field component for content types based on shared "experience" metadata.
 *
 * This includes common fields such as title, address, geographic location, venue type, and price level.
 * It leverages generics to maintain full type safety with react-hook-form.
 *
 * @template T - A type extending FieldValues, matching the form's schema
 * @param {UseFormRegister<T>} register - React Hook Form register function
 * @param {FieldErrors<T>} errors - RHF form error object for displaying validation messages
 *
 * @returns {JSX.Element} A group of labeled input/select fields with inline error messaging
 */
export default function ExperienceFields<T extends FieldValues>({
  register,
  errors,
}: Props<T>) {
  const err = <K extends keyof T>(k: K) =>
    (errors[k]?.message as string | undefined) ?? '';

  return (
    <>
      <label htmlFor="title">
        Title<span className="required">*</span>
        <input id="title" {...register('title' as Path<T>)} />
        {err('title') && <p>{err('title')}</p>}
      </label>

      <label htmlFor="address">
        Address<span className="required">*</span>
        <input id="address" {...register('address' as Path<T>)} />
        {err('address') && <p>{err('address')}</p>}
      </label>

      <label htmlFor="city">
        City<span className="required">*</span>
        <input id="city" {...register('city' as Path<T>)} />
        {err('city') && <p>{err('city')}</p>}
      </label>

      <label htmlFor="state">
        State
        <input id="state" {...register('state' as Path<T>)} />
      </label>

      <label htmlFor="country">
        Country<span className="required">*</span>
        <input id="country" {...register('country' as Path<T>)} />
        {err('country') && <p>{err('country')}</p>}
      </label>

      <label htmlFor="latitude">
        Latitude<span className="required">*</span>
        <input
          id="latitude"
          type="number"
          step="any"
          {...register('latitude' as Path<T>, { valueAsNumber: true })}
        />
        {err('latitude') && <p>{err('latitude')}</p>}
      </label>

      <label htmlFor="longitude">
        Longitude<span className="required">*</span>*
        <input
          id="longitude"
          type="number"
          step="any"
          {...register('longitude' as Path<T>, { valueAsNumber: true })}
        />
        {err('longitude') && <p>{err('longitude')}</p>}
      </label>

      <label htmlFor="venueId">
        Venue<span className="required">*</span>
        <select
          id="venueId"
          {...register('venueId' as Path<T>, { valueAsNumber: true })}
        >
          <option value={-1}>-- Select --</option>
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
        {err('venueId') && <p>{err('venueId')}</p>}
      </label>

      <label htmlFor="priceLevel">
        Price Level<span className="required">*</span>
        <select
          id="priceLevel"
          {...register('priceLevel' as Path<T>, { valueAsNumber: true })}
        >
          <option value={-1}>-- Select --</option>
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
          <option value={5}>$$$$$</option>
        </select>
        {err('priceLevel') && <p>{err('priceLevel')}</p>}
      </label>
    </>
  );
}
