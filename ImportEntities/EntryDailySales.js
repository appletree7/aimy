/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace IbsysPlanspielApp.ImportEntities {
    public class DailySalesEntry : ImportObjectBase {
	  [XmlAttribute("name")]
	  public string Item { get; set; }

	  [XmlAttribute]
	  public int CurrentPeriodSaleQuantity { get; set; }

	  [XmlAttribute]
	  public int SaleQuantity { get; set; }

	  [XmlAttribute]
	  public int OpenQuantity { get; set; }

	  [XmlAttribute]
	  public int ItemsSold { get; set; }

	  [XmlAttribute("ProductionCost")]
	  public string ProductionCostString { get; set; }

	  [XmlIgnore]
	  public double ProductionCost {
		get {
		    return ToDouble(ProductionCostString);
		}
	  }

	  [XmlAttribute]
	  public double SalesReliability {
		get {
		    return 100.0 / CurrentPeriodSaleQuantity * ItemsSold;
		}
	  }

    }
}
