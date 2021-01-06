export default interface Serializable {
    toJSON(): {[key: string]: any};
}