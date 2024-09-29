export abstract class Compare {
  abstract comapre(plain: string, hash: string): Promise<boolean>
}
