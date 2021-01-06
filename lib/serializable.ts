export default interface Serializable {
    toJson(): {[key: string]: any};
}