import supabase from "../supabase";

/**
 * The function `generateCardId` generates a random card ID consisting of three parts separated by
 * dashes.
 * @returns The function `generateCardId` returns a string that consists of three parts separated by
 * hyphens. Each part is a random number with a specific number of digits: a 3-digit number, followed
 * by a 4-digit number, and ending with another 3-digit number.
 */
export function genetateCardId(): string {
  const part1 = Math.floor(100 + Math.random() * 900); // 3 digits
  const part2 = Math.floor(1000 + Math.random() * 9000); // 4 digits
  const part3 = Math.floor(100 + Math.random() * 900); // 3 digits
  return `${part1}-${part2}-${part3}`;
}

/**
 * The `toProper` function in TypeScript React converts a string to proper case, capitalizing the first
 * letter of each word except for specified excluded words.
 * @param {string} str - The `toProper` function takes a string as input and converts it to a proper
 * case format where the first letter of each word is capitalized except for certain excluded words
 * like "of", "in", "and", "the", "on".
 * @returns The function `toProper` takes a string as input, splits it into individual words, and then
 * capitalizes the first letter of each word while converting the rest of the word to lowercase.
 * However, it excludes certain words ("of", "in", "and", "the", "on") from being capitalized unless
 * they are the first word in the string. The function returns the modified string with
 */
export function toProper(str: string): string {
  const excludeWords = ["of", "in", "and", "the", "on"];
  return str
    .split(" ")
    .map((word) => {
      const isExclude = excludeWords.includes(word.toLowerCase());
      return (
        (isExclude
          ? word.charAt(0).toLowerCase()
          : word.charAt(0).toUpperCase()) + word.slice(1).toLowerCase()
      );
    })
    .join(" ");
}

/**
 * The function calculates a person's age based on their birth date, accounting for whether their
 * birthday has passed in the current year.
 * @param {Date} birthDate - The `birthDate` parameter is a `Date` object representing the date of
 * birth of a person for whom you want to calculate the age.
 * @returns The function `calculateAge` returns the age calculated based on the provided birth date.
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassedThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
}

/**
 * The function `uploadProfileImage` uploads a profile image file to a storage service and returns the
 * public URL of the uploaded image.
 * @param {File} file - The `file` parameter in the `uploadProfileImage` function is of type `File`,
 * which represents a file object selected by the user through an input element in a web page.
 * @param {string} id - The `id` parameter in the `uploadProfileImage` function is a string that
 * represents the identifier of the profile for which the image is being uploaded.
 * @returns The `uploadProfileImage` function returns a Promise that resolves to a string. This string
 * is the public URL of the uploaded profile image. If there is an error during the upload process, an
 * error message will be thrown.
 */
export async function uploadProfileImage(
  file: File,
  id: string,
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `profile-${id}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("profiles")
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    throw new Error(`Upload error: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from("profiles")
    .getPublicUrl(fileName);

  return urlData?.publicUrl || "";
}

/* The `export const positions` statement is exporting an array of strings that represent various job
positions or roles in the tech industry. Each element in the array corresponds to a different job
position such as "Programmer", "Software Engineer", "Web Developer", "UI/UX Designer", and many
more. By exporting this array, it makes the `positions` array available for use in other modules or
files that import this module. This allows other parts of the codebase to access and utilize this
predefined list of job positions without having to redefine it. */
export const positions = [
  "Programmer",
  "Software Engineer",
  "Web Developer",
  "UI/UX Designer",
  "System Administrator",
  "Database Administrator",
  "Network Engineer",
  "IT Support Specialist",
  "Project Manager",
  "DevOps Engineer",
  "QA Tester",
  "Cybersecurity Analyst",
  "Mobile App Developer",
  "Data Analyst",
  "Data Scientist",
  "Technical Writer",
  "Machine Learning Engineer",
  "Cloud Architect",
  "Frontend Developer",
  "Backend Developer",
];
