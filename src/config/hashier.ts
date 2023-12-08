import crypto from 'crypto';

function hash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

export { hash };