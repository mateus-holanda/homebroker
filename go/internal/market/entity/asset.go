package entity

type Asset struct {
	ID           string
	Name         string
	MarketVolume int
}

func NewAsset(AssetID, name string, marketVolume int) *Asset {
	return &Asset{
		ID:           AssetID,
		Name:         name,
		MarketVolume: marketVolume,
	}
}
