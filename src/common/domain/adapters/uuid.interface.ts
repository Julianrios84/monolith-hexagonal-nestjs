export abstract class IUUIDService {
  abstract create(): Promise<string>;
}