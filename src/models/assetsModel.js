const sql = require('mssql')
const { poolPromise } = require('../database/db')
const mapFields = require('../utils/fieldMapper')

const schema = {
    tableName: 'Assets',
    columns: {
        id: 'Id',
        assetType: 'AssetType',
        FileName: 'FileName',
        FilePath: 'FilePath',
        MimeType: 'MimeType',
        Size: 'Size',
        CreatedAt: 'CreatedAt',
        UpdatedAt: 'UpdatedAt'
    }
}

const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.assetType]: 'assetType',
    [schema.columns.FileName]: 'FileName',
    [schema.columns.FilePath]: 'FilePath',
    [schema.columns.MimeType]: 'MimeType',
    [schema.columns.Size]: 'Size',
    [schema.columns.CreatedAt]: 'CreatedAt',
    [schema.columns.UpdatedAt]: 'UpdatedAt'
}

class AssetsModel {
    constructor() {
        this.pool = poolPromise
    }

    async getAssetById(assetId) {
        try {
            const pool = await this.pool
            const result = await pool.request()
                .input('assetId', sql.Int, assetId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @assetId`)
            return mapFields(result.recordset[0], fieldMapping)
        } catch (error) {
            console.error('Error fetching asset by ID:', error)
            throw new Error('Database Error')
        }
    }

    async getAssets() {
        const pool = await this.pool
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`)
        return result.recordset.map(asset => mapFields(asset, fieldMapping))
    }

    async createAsset(asset) {
        try {
            const pool = await this.pool
            const result = await pool.request()
                .input('assetType', sql.NVarChar, asset.assetType)
                .input('FileName', sql.NVarChar, asset.FileName)
                .input('FilePath', sql.NVarChar, asset.FilePath)
                .input('MimeType', sql.NVarChar, asset.MimeType)
                .input('Size', sql.Int, asset.Size)
                .query(`INSERT INTO ${schema.tableName} (${schema.columns.assetType}, ${schema.columns.FileName}, ${schema.columns.FilePath}, ${schema.columns.MimeType}, ${schema.columns.Size}) OUTPUT INSERTED.* VALUES (@assetType, @FileName, @FilePath, @MimeType, @Size)`)
            return mapFields(result.recordset[0], fieldMapping)
        } catch (error) {
            console.error('Error creating asset:', error)
            throw new Error('Database Error')
        }
    }
}

module.exports = new AssetsModel
