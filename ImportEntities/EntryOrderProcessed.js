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
    public class OrdersBeeingProcessedEntry : ImportObjectBase{
	  [XmlAttribute]
	  public int WorkplaceNumber { get; set; }

	  [XmlAttribute]
	  public int Period { get; set; }

	  [XmlAttribute]
	  public int OrderNumber { get; set; }

	  [XmlAttribute]
	  public int BatchNumber { get; set; }

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

	  [XmlAttribute("Quantity")]
	  public string QuantityString { get; set; }

	  [XmlIgnore]
	  public int Quantity {
		get {
		    return (int)ToDouble(QuantityString);
		}
	  }

	  [XmlAttribute]
	  public int CycleTime { get; set; }
    }
}
