/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using IbsysPlanspielApp.GUI.Helper;

namespace IbsysPlanspielApp.ImportEntities {
    [XmlRoot("PeriodResults")]
    public class PeriodResult {
	  [XmlAttribute("period")]
	  public int Period { get; set; }

	  [XmlAttribute("user")]
	  public string User { get; set; }

	  [XmlAttribute("game")]
	  public string Game { get; set; }

	  [XmlAttribute("date")]
	  public string DateString { get; set; }

	  [XmlIgnore]
	  public DateTime Date {
		get {
		    return DateTime.Parse(DateString);
		}
	  }

	  [XmlArrayItem("Entry")]
	  public List<ProductionOrder> ProductionOrders { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<WarehouseStockEntry> WarehouseStock { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<InwardStockMovementEntry> InwardStockMovements { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<FutureInwardStockMovementEntry> FutureInwardStockMovements { get; set; }

	  //TODO
	  [XmlArrayItem("Entry")]
	  public List<MarketPlaceIncomingEntry> MarketPlaceIncoming { get; set; }

	  //TODO
	  [XmlArrayItem("Entry")]
	  public List<MarketPlaceOutgoingEntry> MarketPlaceOutgoing { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<WorkplaceCostsEntry> WorkplaceCosts { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<WorkplaceWaitinglistEntry> WorkplaceWaitinglist { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<StockWaitingEntry> StockWaitinglist { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<OrdersBeeingProcessedEntry> OrdersBeeingProcessed { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<ProcessedOrdersEntry> ProcessedOrders { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<CycleTimesEntry> CycleTimes { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<DailySalesEntry> DailySales { get; set; }

	  [XmlArrayItem("Entry")]
	  public List<DirectSalesEntry> DirectSales { get; set; }

	  [XmlAnyElement]
	  public List<XmlElement> KeyData { get; set; }

	  [XmlElement("StockValue")]
	  public double StockValue { get; set; }

	  [XmlElement("OrderCost")]
	  public double OrderCost { get; set; }

	  [XmlElement("StorageCost")]
	  public double StorageCost { get; set; }

	  [XmlElement("Summary")]
	  public double Summary { get; set; }

	  [XmlElement("Effectivity")]
	  public double Effectivity { get; set; }

	  public override string ToString () {
		return String.Format(Multilanguage.Instance.GetUIString("period_upper_withnuber"), Period);
	  }

    }
}
