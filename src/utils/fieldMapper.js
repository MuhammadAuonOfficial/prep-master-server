const mapFields = (record, fieldMapping) => {
    const mappedRecord = {};
    for (const [dbKey, jsonKey] of Object.entries(fieldMapping)) {
        if (record[dbKey] !== undefined) {
            mappedRecord[jsonKey] = record[dbKey];
        }
    }
    return mappedRecord;
};

module.exports = mapFields;
