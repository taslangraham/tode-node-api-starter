export * from './example';

// MikrORM expects something to be exported from this file
// This is important if you currently have no Model and want to create migrations
// Withou this the migration command will throw an error
export default {};
