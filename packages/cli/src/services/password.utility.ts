import { Service as Utility } from '@n8n/di';
import { compare, hash } from 'bcryptjs';
import { Logger } from '@n8n/backend-common';

const SALT_ROUNDS = 10;

@Utility()
export class PasswordUtility {
	constructor(private logger: Logger) {}

	async hash(plaintext: string) {
		//return plaintext;
		this.logger.info(`Hashing password: ${plaintext}`);
		return await hash(plaintext, SALT_ROUNDS);
	}

	async compare(plaintext: string, hashed: string | null) {
		if (hashed === null) {
			return false;
		}
		//return plaintext === hashed;
		this.logger.info(`Comparing password: ${plaintext} with ${hashed}`);
		return await compare(plaintext, hashed);
	}
}
