import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

countries.registerLocale(enLocale);

export type PhoneCountryOption = {
  value: string;
  label: string;
  buttonLabel: string;
  dialCode: string;
};

export const phoneCountryOptions: PhoneCountryOption[] = getCountries()
  .map((countryCode) => {
    const name = countries.getName(countryCode, "en", { select: "official" }) ?? countryCode;
    const dial = `+${getCountryCallingCode(countryCode as CountryCode)}`;
    const buttonLabel = `${countryCode} ${dial}`;
    return {
      value: countryCode,
      label: `${countryCode} ${name} ${dial}`,
      buttonLabel,
      dialCode: dial,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export function getDialCode(countryCode: string) {
  const country = phoneCountryOptions.find((opt) => opt.value === countryCode);
  return country?.dialCode ?? "";
}

export function isValidPhoneNumber(countryCode: string, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const parsed = parsePhoneNumberFromString(trimmed, countryCode as CountryCode);
  if (!parsed) return false;
  if (!parsed.isValid()) return false;

  return parsed.country === (countryCode as CountryCode);
}
