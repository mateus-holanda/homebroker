package entity

type Investor struct {
	ID            string
	Name          string
	AssetPosition []*InvestorAssetPosition
}

type InvestorAssetPosition struct {
	AssetID string
	Shares  int
}

func NewInvestor(investorID string) *Investor {
	return &Investor{
		ID:            investorID,
		AssetPosition: []*InvestorAssetPosition{},
	}
}

func (i *Investor) AddAssetPosition(assetPosition *InvestorAssetPosition) {
	i.AssetPosition = append(i.AssetPosition, assetPosition)
}

func (i *Investor) GetAssetPosition(assetID string) *InvestorAssetPosition {
	for _, assetPosition := range i.AssetPosition {
		if assetPosition.AssetID == assetID {
			return assetPosition
		}
	}

	return nil
}

func (i *Investor) AdjustAssetPosition(assetID string, shares int) {
	assetPosition := i.GetAssetPosition(assetID)

	if assetPosition == nil {
		i.AssetPosition = append(i.AssetPosition, NewInvestorAssetPosition(assetID, shares))
	} else {
		assetPosition.AddShares(shares)
	}
}

func NewInvestorAssetPosition(assetID string, shares int) *InvestorAssetPosition {
	return &InvestorAssetPosition{
		AssetID: assetID,
		Shares:  shares,
	}
}

func (iap *InvestorAssetPosition) AddShares(quantity int) {
	iap.Shares += quantity
}
