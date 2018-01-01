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
    public class WarehouseStockEntry : ImportObjectBase {
	  [XmlAttribute]
	  public string Item { get; set; }

	  [XmlIgnore]
	  public long ArticleId {
		get {
		    return IdFromItem(Item);
		}
	  }
	  [XmlIgnore]
	  public string ArticleName {
		get {
		    return NameFromItem(Item);
		}
	  }

	  [XmlAttribute]
	  public int InitialAmount { get; set; }

	  [XmlAttribute]
	  public int Amount { get; set; }

	  [XmlIgnore]
	  public double RelativeChange {
		get {
		    return InitialAmount * 1.0 / Amount * 100;
		}
	  }

	  [XmlAttribute("Price")]
	  public string PriceString { get; set; }

	  [XmlAttribute("StockValue")]
	  public string StockValueString { get; set; }

	  [XmlIgnore]
	  public double Price {
		get {
		    return ToDouble(PriceString);
		}
	  }

	  [XmlIgnore]
	  public double StockValue {
		get {
		    return ToDouble(StockValueString);
		}
	  }
    }
}
