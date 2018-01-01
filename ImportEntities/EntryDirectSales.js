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
    public class DirectSalesEntry : ImportObjectBase {

	  [XmlAttribute("name")]
	  public string Name { get; set; }

	  [XmlAttribute]
	  public int Quantity { get; set; }

	  [XmlAttribute]
	  public int OpenQuantity { get; set; }

	  [XmlAttribute]
	  public int ItemsSold { get; set; }

	  [XmlAttribute("Price")]
	  public string PriceString { get; set; }

	  [XmlIgnore]
	  public double Price {
		get {
		    return ToDouble(PriceString);
		}
	  }

	  [XmlAttribute("Income")]
	  public string IncomeString { get; set; }

	  [XmlIgnore]
	  public double Income {
		get {
		    return ToDouble(IncomeString);
		}
	  }

	  [XmlAttribute("Penalty")]
	  public string PenaltyString { get; set; }

	  [XmlIgnore]
	  public double Penalty {
		get {
		    return ToDouble(PenaltyString);
		}
	  }

	  [XmlAttribute("ProductionCost")]
	  public string ProductionCostString { get; set; }

	  [XmlIgnore]
	  public double ProductionCost {
		get {
		    return ToDouble(ProductionCostString);
		}
	  }

	  [XmlAttribute("Profit")]
	  public string ProfitString { get; set; }

	  [XmlIgnore]
	  public double Profit {
		get {
		    return ToDouble(ProfitString);
		}
	  }

	  [XmlAttribute("ProfitPerUnit")]
	  public string ProfitPerUnitString { get; set; }

	  [XmlIgnore]
	  public double ProfitPerUnit {
		get {
		    return ToDouble(ProfitPerUnitString);
		}
	  }

	  [XmlIgnore]
	  public double SalesReliability {
		get {
		    return 100.0 / Quantity * ItemsSold;
		}
	  }
    }
}
